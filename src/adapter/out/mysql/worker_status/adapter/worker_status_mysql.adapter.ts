import { logger } from "@logger";
import { IWorkerStatusMySQLRepository as IWorkerStatusMySQLRepository } from "../repository/worker_status_mysql.base_repository";
import { WorkerStatusMySQLRepository } from "../repository/worker_status_mysql.repository";
import { IWorkerStatusMySQLAdapter as IWorkerStatusMySQLAdapter } from "./worker_status_mysql.base_adapter";
import { Filter } from "@domain/filter";
import { WorkerStatus } from "@domain/worker_status";
import { toDomain, toEntity, toPartialDomain, toPartialEntity } from "../util/worker_status_mysql.converter";
import { Stats } from "@domain/stats";

export class WorkerStatusMySQLAdapter implements IWorkerStatusMySQLAdapter {
  private WorkerStatusSqlRepository: IWorkerStatusMySQLRepository

  constructor(){
    this.WorkerStatusSqlRepository = new WorkerStatusMySQLRepository();
  }
  async getAll(currentPage?: number, perPage?: number, filter?: Filter, traceId?: string): Promise<{ data: WorkerStatus[]; stats: Stats; }> {
    logger.info(this.getAll.name, WorkerStatusMySQLAdapter.name, traceId);
    const { data, stats } = await this.WorkerStatusSqlRepository.getAll(currentPage, perPage, filter, traceId);

    return {
      data: data.map((worker_status) => toDomain(worker_status)),
      stats,
    }
  }
  
  async getById(id: number, traceId?: string): Promise<WorkerStatus | null> {
    logger.info(this.getById.name, WorkerStatusMySQLAdapter.name, traceId);
    const worker_status = await this.WorkerStatusSqlRepository.getById(id, traceId);
    if (!worker_status) return null;

    return toDomain(worker_status);
  }
  
  async create(data: WorkerStatus, traceId?: string): Promise<WorkerStatus> {
    logger.info(this.create.name, WorkerStatusMySQLAdapter.name, traceId);
    return toDomain(await this.WorkerStatusSqlRepository.create(toEntity(data), traceId));
  }
  
  async update(id: number, data: Partial<WorkerStatus>, traceId?: string): Promise<Partial<WorkerStatus> | null> {
    logger.info(this.update.name, WorkerStatusMySQLAdapter.name, traceId);
    const worker_status = await this.WorkerStatusSqlRepository.update(id, toPartialEntity(data), traceId);
    if (!worker_status) return null;

    return toPartialDomain(worker_status);
  }
  
  async delete(id: number, traceId?: string): Promise<boolean> {
    logger.info(this.delete.name, WorkerStatusMySQLAdapter.name, traceId);
    return await this.WorkerStatusSqlRepository.delete(id, traceId);
  }
  
}