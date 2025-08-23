import { Knex } from "knex";
import { WorkerStatusMySQLEntity } from "../entity/worker_status_mysql.entity";
import { Filter } from "@domain/filter";
import { logger } from "@logger";
import { IWorkerStatusMySQLRepository } from "./worker_status_mysql.base_repository";
import { Stats } from "@domain/stats";
import { TABLE_NAME } from "@domain/constant";
import { getMysqlClient } from "@mysql";
import { removeUndefinedField } from "@util/converter/global_converter";
import { ApplicationError } from "@util/error/application_error";
import { HttpError } from "@util/error/type/http_error";

export type FindNearestParams = {
  longitude: number;
  latitude: number;
  limit?: number;             // default 1
  radiusMeters?: number;      // optional maximum distance filter
  status?: number;            // filter worker status column
  fields?: string[];          // select specific fields instead of *
  onlyLatestPerWorker?: boolean; // if true, only newest row per worker_id
  maxAgeSeconds?: number;     // ignore rows older than now - maxAgeSeconds (using updated_at)
  useHaversineFallback?: boolean; // force Haversine instead of ST_Distance_Sphere
};

export class WorkerStatusMySQLRepository implements IWorkerStatusMySQLRepository { 
  private readonly orm: Knex.QueryBuilder<WorkerStatusMySQLEntity, WorkerStatusMySQLEntity[]>;
  private readonly tableName: string = TABLE_NAME.WORKER_STATUS;
  private readonly knex: Knex;

  constructor() {
    this.knex = getMysqlClient();
    this.orm = this.knex<WorkerStatusMySQLEntity>(this.tableName);
  }
  
  private applyFilters(builder: Knex.QueryBuilder<WorkerStatusMySQLEntity, any>, filter?: Filter) {
    if (filter?.status) {
      builder.where("status", filter.status);
    }

    if (filter?.workerId) {
      builder.where("worker_id", filter.workerId);
    }
  }
  
  async getAll(currentPage: number = 1, perPage: number = 10, filter?: Filter, traceId?: string):  Promise<{ data: WorkerStatusMySQLEntity[], stats: Stats }>{
    logger.info(this.getAll.name, WorkerStatusMySQLRepository.name, traceId);
    
    const offset = (currentPage - 1) * perPage;

    const baseQuery = this.orm.clone().select(
      filter?.fields ? filter.fields : "*"
    ).where((builder) => {
      this.applyFilters(builder, filter);
    });

    const [data, countResult] = await Promise.all([
      baseQuery.clone().offset(offset).limit(perPage),
      baseQuery.clone().clearSelect().count<{ count: string }>("* as count").first(),
    ]);

    const totalData = parseInt(countResult?.count ?? "0", 10);
    const totalPage = Math.ceil(totalData / perPage);

    return {
      data,
      stats: {
        totalData,
        currentPage,
        totalPage,
        perPage,
      },
    };
  
  }

  async getById(id: number, traceId?: string): Promise<WorkerStatusMySQLEntity | null> {
    logger.info(this.getById.name, WorkerStatusMySQLRepository.name, traceId);
  
    return this.orm
      .clone()
      .where({ worker_id: id })
      .first()
      .then((result) => result ?? null);
  }
  
  async create(data: WorkerStatusMySQLEntity, traceId?: string): Promise<WorkerStatusMySQLEntity> {
    logger.info(this.create.name, WorkerStatusMySQLRepository.name, traceId);
  
    const connection = await this.orm.client.acquireConnection();

    try {
      const promiseConnection = connection.promise();
      
      const [insertResult] = await promiseConnection.query(
        'INSERT INTO ?? SET ?', 
        [this.tableName, data]
      );
      
      const [rows] = await promiseConnection.query(
        'SELECT * FROM ?? WHERE id = ?', 
        [this.tableName, insertResult.insertId]
      );
      
      const created = rows[0];
      
      if (!created) {
        throw new ApplicationError(HttpError('Failed to insert data').INTERNAL_SERVER_ERROR)
      }

      return created;
    } finally {
      this.orm.client.releaseConnection(connection);
    }
  }
  
  async update(id: number, data: Partial<WorkerStatusMySQLEntity>, traceId?: string): Promise<WorkerStatusMySQLEntity | null> {
    logger.info(this.update.name, WorkerStatusMySQLRepository.name, traceId);
  
      const connection = await this.orm.client.acquireConnection();

    try {
      const promiseConnection = connection.promise();

      await promiseConnection.query(
        'UPDATE ?? SET ? WHERE worker_id = ?', 
        [this.tableName, removeUndefinedField(data), id]
      );
      
      const [updated] = await promiseConnection.query(
        'SELECT * FROM ?? WHERE worker_id = ?', 
        [this.tableName, id]
      );
      
      return updated;
    } finally {
      this.orm.client.releaseConnection(connection);
    }
  }
  
  async delete(id: number, traceId?: string): Promise<boolean> {
    logger.info(this.delete.name, WorkerStatusMySQLRepository.name, traceId);
  
    const connection = await this.orm.client.acquireConnection();
    const promiseConnection = connection.promise();

    try {
      const result = await promiseConnection.query(
        'DELETE FROM ?? WHERE worker_id = ?', 
        [this.tableName, id]
      );
      
      return result.affectedRows > 0;
    } finally {
      this.orm.client.releaseConnection(connection);
    }
  }

   /**
   * Convenience: fetch latitude/longitude from a report_history (or report) table row,
   * then call findNearest with those coordinates.
   *
   * @param reportHistoryId ID of the row in reportHistoryTable
   * @param params Additional nearest params (except lon/lat)
   * @param traceId Optional trace ID for logging
   */
  async findNearestByReportHistory(
    reportHistoryId: number,
    params: Omit<FindNearestParams, "longitude" | "latitude"> & {
      reportHistoryTable?: string;
      idColumn?: string;
      longitudeColumn?: string;
      latitudeColumn?: string;
    } = {},
    traceId?: string
  ): Promise<(WorkerStatusMySQLEntity & { distance_m: number })[]> {
    logger.info(
      this.findNearestByReportHistory.name,
      WorkerStatusMySQLRepository.name,
      traceId
    );

    const {
      reportHistoryTable = TABLE_NAME.REPORT_HISTORY,
      idColumn = "id",
      longitudeColumn = "longitude",
      latitudeColumn = "latitude",
      ...rest
    } = params;

    const coordRow = await this.knex(reportHistoryTable)
      .select({ longitude: longitudeColumn, latitude: latitudeColumn })
      .where(idColumn, reportHistoryId)
      .first();

    if (!coordRow || coordRow.longitude == null || coordRow.latitude == null) {
      return [];
    }

    return this.findNearest(
      {
        longitude: coordRow.longitude,
        latitude: coordRow.latitude,
        ...rest,
      },
      traceId
    );
  }

   /**
   * Core nearest-location query using either ST_Distance_Sphere (preferred) or Haversine fallback.
   */
  async findNearest(
    params: FindNearestParams,
    traceId?: string
  ): Promise<(WorkerStatusMySQLEntity & { distance_m: number })[]> {
    const {
      longitude,
      latitude,
      limit = 1,
      radiusMeters,
      status,
      fields,
      onlyLatestPerWorker = true,
      maxAgeSeconds,
      useHaversineFallback = false,
    } = params;

    logger.info(this.findNearest.name, WorkerStatusMySQLRepository.name, traceId);

    // Base builder (optionally latest per worker)
    let baseQuery: Knex.QueryBuilder<any, any>;

    if (onlyLatestPerWorker) {
      const sub = this.knex(this.tableName)
        .select(this.knex.raw("MAX(updated_at) as updated_at"), "worker_id")
        .groupBy("worker_id")
        .as("latest_ws");

      baseQuery = this.knex({ ws: this.tableName }).join(sub, function () {
        this.on("ws.worker_id", "=", "latest_ws.worker_id").andOn(
          "ws.updated_at",
          "=",
          "latest_ws.updated_at"
        );
      });
    } else {
      baseQuery = this.knex({ ws: this.tableName });
    }

    // Optional filters
    if (status !== undefined) {
      baseQuery.where("ws.status", status);
    }

    if (maxAgeSeconds && Number.isFinite(maxAgeSeconds)) {
      const nowSec = Math.floor(Date.now() / 1000);
      baseQuery.where("ws.updated_at", ">=", nowSec - maxAgeSeconds);
    }

    // Distance expression
    let distanceExpr: Knex.Raw;
    if (useHaversineFallback) {
      // Haversine (returns meters)
      distanceExpr = this.knex.raw(
        `(
          6371000 * 2 * ASIN(
            SQRT(
              POWER(SIN(RADIANS((? - ws.latitude) / 2)), 2) +
              COS(RADIANS(ws.latitude)) * COS(RADIANS(?)) *
              POWER(SIN(RADIANS((? - ws.longitude) / 2)), 2)
            )
          )
        )`,
        [latitude, latitude, longitude]
      );
    } else {
      // MySQL 8.0 ST_Distance_Sphere
      distanceExpr = this.knex.raw(
        `ST_Distance_Sphere(POINT(ws.longitude, ws.latitude), POINT(?, ?))`,
        [longitude, latitude]
      );
    }

    const selectFields = fields && fields.length > 0 ? fields.map(f => `ws.${f}`) : ["ws.*"];

    const query = baseQuery
      .select([
        ...selectFields,
        { distance_m: distanceExpr },
      ])
      .orderBy("distance_m", "asc")
      .limit(limit);

    if (radiusMeters && Number.isFinite(radiusMeters)) {
      // Need HAVING because distance_m is an alias
      query.havingRaw("distance_m <= ?", [radiusMeters]);
    }

    const rows = await query;
    return rows as (WorkerStatusMySQLEntity & { distance_m: number })[];
  }

}