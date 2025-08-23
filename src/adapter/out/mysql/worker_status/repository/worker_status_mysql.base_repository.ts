import { Stats } from "@domain/stats"
import { Filter } from "@domain/filter"
import { WorkerStatusMySQLEntity } from "../entity/worker_status_mysql.entity"

export interface IWorkerStatusMySQLRepository {
  getAll(currentPage?: number, perPage?: number, filter?: Filter, traceId?: string): Promise<{ data: WorkerStatusMySQLEntity[], stats: Stats}>
  getById(id: number, traceId?: string): Promise<WorkerStatusMySQLEntity | null>
  create(data: WorkerStatusMySQLEntity, traceId?: string): Promise<WorkerStatusMySQLEntity>
  update(id: number, data: Partial<WorkerStatusMySQLEntity>, traceId?: string): Promise<Partial<WorkerStatusMySQLEntity> | null>
  delete(id: number, traceId?: string): Promise<boolean>
}