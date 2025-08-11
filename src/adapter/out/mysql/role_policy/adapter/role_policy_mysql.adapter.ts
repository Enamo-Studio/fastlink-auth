import { logger } from "@logger";
import { IRolePolicyMySQLRepository as IRolePolicyMySQLRepository } from "../repository/role_policy_mysql.base_repository";
import { RolePolicyMySQLRepository } from "../repository/role_policy_mysql.repository";
import { IRolePolicyMySQLAdapter as IRolePolicyMySQLAdapter } from "./role_policy_mysql.base_adapter";
import { Filter } from "@domain/filter";
import { RolePolicy } from "@domain/role_policy";
import { toDomain, toEntity, toPartialDomain, toPartialEntity } from "../util/role_policy_mysql.converter";
import { Stats } from "@domain/stats";

export class RolePolicyMySQLAdapter implements IRolePolicyMySQLAdapter {
  private RolePolicySqlRepository: IRolePolicyMySQLRepository

  constructor(){
    this.RolePolicySqlRepository = new RolePolicyMySQLRepository();
  }
  async getAll(currentPage?: number, perPage?: number, filter?: Filter, traceId?: string): Promise<{ data: RolePolicy[]; stats: Stats; }> {
    logger.info(this.getAll.name, RolePolicyMySQLAdapter.name, traceId);
    const { data, stats } = await this.RolePolicySqlRepository.getAll(currentPage, perPage, filter, traceId);

    return {
      data: data.map((role_policy) => toDomain(role_policy)),
      stats,
    }
  }
  
  async getById(id: number, traceId?: string): Promise<RolePolicy | null> {
    logger.info(this.getById.name, RolePolicyMySQLAdapter.name, traceId);
    const role_policy = await this.RolePolicySqlRepository.getById(id, traceId);
    if (!role_policy) return null;

    return toDomain(role_policy);
  }
  
  async create(data: RolePolicy, traceId?: string): Promise<RolePolicy> {
    logger.info(this.create.name, RolePolicyMySQLAdapter.name, traceId);
    return toDomain(await this.RolePolicySqlRepository.create(toEntity(data), traceId));
  }
  
  async update(id: number, data: Partial<RolePolicy>, traceId?: string): Promise<Partial<RolePolicy> | null> {
    logger.info(this.update.name, RolePolicyMySQLAdapter.name, traceId);
    const role_policy = await this.RolePolicySqlRepository.update(id, toPartialEntity(data), traceId);
    if (!role_policy) return null;

    return toPartialDomain(role_policy);
  }
  
  async delete(id: number, traceId?: string): Promise<boolean> {
    logger.info(this.delete.name, RolePolicyMySQLAdapter.name, traceId);
    return await this.RolePolicySqlRepository.delete(id, traceId);
  }
  
}