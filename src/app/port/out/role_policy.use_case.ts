import { Stats } from "@domain/stats"
import { Filter } from "@domain/filter"
import { RolePolicy } from "@domain/role_policy"

export interface IRolePolicyUseCase {
  getAll(currentPage?: number, perPage?: number, filter?: Filter, traceId?: string): Promise<{ data: RolePolicy[], stats: Stats }>
  getById(id: number, traceId?: string): Promise<RolePolicy | null>
  create(data: RolePolicy, traceId?: string): Promise<RolePolicy>
  update(id: number, data: Partial<RolePolicy>, traceId?: string): Promise<Partial<RolePolicy> | null>
  delete(id: number, traceId?: string): Promise<boolean>
}