import { Stats } from "@domain/stats"
import { Filter } from "@domain/filter"
import { WorkerStatus } from "@domain/worker_status"

export interface IWorkerStatusUseCase {
  getAll(currentPage?: number, perPage?: number, filter?: Filter, traceId?: string): Promise<{ data: WorkerStatus[], stats: Stats }>
  getById(id: number, traceId?: string): Promise<WorkerStatus | null>
  create(data: WorkerStatus, traceId?: string): Promise<WorkerStatus>
  update(id: number, data: Partial<WorkerStatus>, traceId?: string): Promise<Partial<WorkerStatus> | null>
  delete(id: number, traceId?: string): Promise<boolean>
}