import { Stats } from "@domain/stats"
import { Filter } from "@domain/filter"
import { RolePolicyMySQLEntity } from "../entity/role_policy_mysql.entity"

export interface IRolePolicyMySQLRepository {
  getAll(currentPage?: number, perPage?: number, filter?: Filter, traceId?: string): Promise<{ data: RolePolicyMySQLEntity[], stats: Stats}>
  getById(id: number, traceId?: string): Promise<RolePolicyMySQLEntity | null>
  create(data: RolePolicyMySQLEntity, traceId?: string): Promise<RolePolicyMySQLEntity>
  update(id: number, data: Partial<RolePolicyMySQLEntity>, traceId?: string): Promise<Partial<RolePolicyMySQLEntity> | null>
  delete(id: number, traceId?: string): Promise<boolean>
}