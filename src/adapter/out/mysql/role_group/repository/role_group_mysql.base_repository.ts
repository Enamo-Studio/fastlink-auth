import { Stats } from "@domain/stats"
import { Filter } from "@domain/filter"
import { RoleGroupMySQLEntity } from "../entity/role_group_mysql.entity"

export interface IRoleGroupMySQLRepository {
  getAll(currentPage?: number, perPage?: number, filter?: Filter, traceId?: string): Promise<{ data: RoleGroupMySQLEntity[], stats: Stats}>
  getById(id: number, traceId?: string): Promise<RoleGroupMySQLEntity | null>
  create(data: RoleGroupMySQLEntity, traceId?: string): Promise<RoleGroupMySQLEntity>
  update(id: number, data: Partial<RoleGroupMySQLEntity>, traceId?: string): Promise<Partial<RoleGroupMySQLEntity> | null>
  delete(id: number, traceId?: string): Promise<boolean>
}