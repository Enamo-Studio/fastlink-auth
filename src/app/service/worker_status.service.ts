import { WorkerStatusMySQLAdapter } from "@adapter_out/mysql/worker_status/adapter/worker_status_mysql.adapter";
import { IWorkerStatusMySQLAdapter } from "@adapter_out/mysql/worker_status/adapter/worker_status_mysql.base_adapter";
import { WorkerStatus } from "@domain/worker_status";
import { Filter } from "@domain/filter";
import { Stats } from "@domain/stats";
import { logger } from "@logger";
import { IWorkerStatusUseCase } from "@use_case/worker_status.use_case";
import { getUnixTimeStamp } from "@util/helper/moment";

export class WorkerStatusService implements IWorkerStatusUseCase {
  private mysqlAdapter: IWorkerStatusMySQLAdapter;

  constructor() {
    this.mysqlAdapter = new WorkerStatusMySQLAdapter();
  }
  
  async getAll(currentPage?: number, perPage?: number, filter?: Filter, traceId?: string): Promise<{ data: WorkerStatus[], stats: Stats }> {
    logger.info(this.getAll.name, WorkerStatusService.name, traceId);
    return await this.mysqlAdapter.getAll(currentPage, perPage, filter, traceId);
  }
  
  async getById(id: number, traceId?: string): Promise<WorkerStatus | null> {
    logger.info(this.getById.name, WorkerStatusService.name, traceId);
    return await this.mysqlAdapter.getById(id, traceId);
  }
  
  async create(data: WorkerStatus, traceId?: string): Promise<WorkerStatus> {
    logger.info(this.create.name, WorkerStatusService.name, traceId);
    return await this.mysqlAdapter.create(data, traceId);
  }

  async update(id: number, data: Partial<WorkerStatus>, traceId?: string): Promise<Partial<WorkerStatus> | null> {
    logger.info(this.update.name, WorkerStatusService.name, traceId);
    return await this.mysqlAdapter.update(id, {...data, updatedAt: getUnixTimeStamp()}, traceId);
  }

  async delete(id: number, traceId?: string): Promise<boolean> {
    logger.info(this.delete.name, WorkerStatusService.name, traceId);
    return await this.mysqlAdapter.delete(id, traceId);
  }

}