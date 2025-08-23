export type WorkerStatus = {
  workerId: number
  longitude: number | null
  latitude: number | null
  status: WorkerStatusEnum
  createdAt: number
  updatedAt: number
}

export enum WorkerStatusEnum {
  ONLINE = 1,
  OFFLINE = 2,
  BUSY = 3,
  IDLE = 4
} 