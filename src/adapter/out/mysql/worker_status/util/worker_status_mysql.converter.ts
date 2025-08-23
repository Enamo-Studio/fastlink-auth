import { WorkerStatus } from "@domain/worker_status";
import { WorkerStatusMySQLEntity } from "../entity/worker_status_mysql.entity";

export const toDomain = (entity: WorkerStatusMySQLEntity): WorkerStatus => {
  return {
    workerId: entity.worker_id,
    longitude: entity.longitude,
    latitude: entity.latitude,
    status: entity.status,
    createdAt: entity.created_at,
    updatedAt: entity.updated_at,
  };
};

export const toEntity = (domain: WorkerStatus): WorkerStatusMySQLEntity => {
  return {
    worker_id: domain.workerId,
    longitude: domain.longitude,
    latitude: domain.latitude,
    status: domain.status,
    created_at: domain.createdAt,
    updated_at: domain.updatedAt,
  };
};

export const toPartialDomain = (entity: Partial<WorkerStatusMySQLEntity>): Partial<WorkerStatus> => {
  return {
    workerId: entity.worker_id,
    longitude: entity.longitude,
    latitude: entity.latitude,
    status: entity.status,
    createdAt: entity.created_at,
    updatedAt: entity.updated_at,
  };
};

export const toPartialEntity = (domain: Partial<WorkerStatus>): Partial<WorkerStatusMySQLEntity> => {
  return {
    worker_id: domain.workerId,
    longitude: domain.longitude,
    latitude: domain.latitude,
    status: domain.status,
    created_at: domain.createdAt,
    updated_at: domain.updatedAt,
  };
};
