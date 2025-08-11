import { RolePolicyMySQLAdapter } from "@adapter_out/mysql/role_policy/adapter/role_policy_mysql.adapter";
import { IRolePolicyMySQLAdapter } from "@adapter_out/mysql/role_policy/adapter/role_policy_mysql.base_adapter";
import { RolePolicy } from "@domain/role_policy";
import { Filter } from "@domain/filter";
import { Stats } from "@domain/stats";
import { logger } from "@logger";
import { IRolePolicyUseCase } from "@use_case/role_policy.use_case";

export class RolePolicyService implements IRolePolicyUseCase {
  private mysqlAdapter: IRolePolicyMySQLAdapter;

  constructor() {
    this.mysqlAdapter = new RolePolicyMySQLAdapter();
  }
  
  async getAll(currentPage?: number, perPage?: number, filter?: Filter, traceId?: string): Promise<{ data: RolePolicy[], stats: Stats }> {
    logger.info(this.getAll.name, RolePolicyService.name, traceId);
    return await this.mysqlAdapter.getAll(currentPage, perPage, filter, traceId);
  }
  
  async getById(id: number, traceId?: string): Promise<RolePolicy | null> {
    logger.info(this.getById.name, RolePolicyService.name, traceId);
    return await this.mysqlAdapter.getById(id, traceId);
  }
  
  async create(data: RolePolicy, traceId?: string): Promise<RolePolicy> {
    logger.info(this.create.name, RolePolicyService.name, traceId);
    return await this.mysqlAdapter.create(data, traceId);
  }

  async update(id: number, data: Partial<RolePolicy>, traceId?: string): Promise<Partial<RolePolicy> | null> {
    logger.info(this.update.name, RolePolicyService.name, traceId);
    return await this.mysqlAdapter.update(id, data, traceId);
  }

  async delete(id: number, traceId?: string): Promise<boolean> {
    logger.info(this.delete.name, RolePolicyService.name, traceId);
    return await this.mysqlAdapter.delete(id, traceId);
  }

}