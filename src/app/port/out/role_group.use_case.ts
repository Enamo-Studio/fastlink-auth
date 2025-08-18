import { Stats } from "@domain/stats"
import { Filter } from "@domain/filter"
import { RoleGroup } from "@domain/role_group"

export interface IRoleGroupUseCase {
  getAll(currentPage?: number, perPage?: number, filter?: Filter, traceId?: string): Promise<{ data: RoleGroup[], stats: Stats }>
  getById(id: number, traceId?: string): Promise<RoleGroup | null>
  create(data: RoleGroup, traceId?: string): Promise<RoleGroup>
  update(id: number, data: Partial<RoleGroup>, traceId?: string): Promise<Partial<RoleGroup> | null>
  delete(id: number, traceId?: string): Promise<boolean>
}