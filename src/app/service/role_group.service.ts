import { RoleGroupMySQLAdapter } from "@adapter_out/mysql/role_group/adapter/role_group_mysql.adapter";
import { IRoleGroupMySQLAdapter } from "@adapter_out/mysql/role_group/adapter/role_group_mysql.base_adapter";
import { RoleGroup } from "@domain/role_group";
import { Filter } from "@domain/filter";
import { Stats } from "@domain/stats";
import { logger } from "@logger";
import { IRoleGroupUseCase } from "@use_case/role_group.use_case";

export class RoleGroupService implements IRoleGroupUseCase {
  private mysqlAdapter: IRoleGroupMySQLAdapter;

  constructor() {
    this.mysqlAdapter = new RoleGroupMySQLAdapter();
  }
  
  async getAll(currentPage?: number, perPage?: number, filter?: Filter, traceId?: string): Promise<{ data: RoleGroup[], stats: Stats }> {
    logger.info(this.getAll.name, RoleGroupService.name, traceId);
    return await this.mysqlAdapter.getAll(currentPage, perPage, filter, traceId);
  }
  
  async getById(id: number, traceId?: string): Promise<RoleGroup | null> {
    logger.info(this.getById.name, RoleGroupService.name, traceId);
    return await this.mysqlAdapter.getById(id, traceId);
  }
  
  async create(data: RoleGroup, traceId?: string): Promise<RoleGroup> {
    logger.info(this.create.name, RoleGroupService.name, traceId);
    return await this.mysqlAdapter.create(data, traceId);
  }

  async update(id: number, data: Partial<RoleGroup>, traceId?: string): Promise<Partial<RoleGroup> | null> {
    logger.info(this.update.name, RoleGroupService.name, traceId);
    return await this.mysqlAdapter.update(id, data, traceId);
  }

  async delete(id: number, traceId?: string): Promise<boolean> {
    logger.info(this.delete.name, RoleGroupService.name, traceId);
    return await this.mysqlAdapter.delete(id, traceId);
  }

}