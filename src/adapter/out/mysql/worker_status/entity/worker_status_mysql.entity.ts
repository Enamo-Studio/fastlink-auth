import { WorkerStatusEnum } from "@domain/worker_status" 

export type WorkerStatusMySQLEntity = {
  worker_id: number
  longitude: number | null
  latitude: number | null
  status: WorkerStatusEnum
  created_at: number
  updated_at: number
}