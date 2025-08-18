import { logger } from "@logger";
import { IRoleGroupMySQLRepository as IRoleGroupMySQLRepository } from "../repository/role_group_mysql.base_repository";
import { RoleGroupMySQLRepository } from "../repository/role_group_mysql.repository";
import { IRoleGroupMySQLAdapter as IRoleGroupMySQLAdapter } from "./role_group_mysql.base_adapter";
import { Filter } from "@domain/filter";
import { RoleGroup } from "@domain/role_group";
import { toDomain, toEntity, toPartialDomain, toPartialEntity } from "../util/role_group_mysql.converter";
import { Stats } from "@domain/stats";

export class RoleGroupMySQLAdapter implements IRoleGroupMySQLAdapter {
  private RoleGroupSqlRepository: IRoleGroupMySQLRepository

  constructor(){
    this.RoleGroupSqlRepository = new RoleGroupMySQLRepository();
  }
  async getAll(currentPage?: number, perPage?: number, filter?: Filter, traceId?: string): Promise<{ data: RoleGroup[]; stats: Stats; }> {
    logger.info(this.getAll.name, RoleGroupMySQLAdapter.name, traceId);
    const { data, stats } = await this.RoleGroupSqlRepository.getAll(currentPage, perPage, filter, traceId);

    return {
      data: data.map((role_group) => toDomain(role_group)),
      stats,
    }
  }
  
  async getById(id: number, traceId?: string): Promise<RoleGroup | null> {
    logger.info(this.getById.name, RoleGroupMySQLAdapter.name, traceId);
    const role_group = await this.RoleGroupSqlRepository.getById(id, traceId);
    if (!role_group) return null;

    return toDomain(role_group);
  }
  
  async create(data: RoleGroup, traceId?: string): Promise<RoleGroup> {
    logger.info(this.create.name, RoleGroupMySQLAdapter.name, traceId);
    return toDomain(await this.RoleGroupSqlRepository.create(toEntity(data), traceId));
  }
  
  async update(id: number, data: Partial<RoleGroup>, traceId?: string): Promise<Partial<RoleGroup> | null> {
    logger.info(this.update.name, RoleGroupMySQLAdapter.name, traceId);
    const role_group = await this.RoleGroupSqlRepository.update(id, toPartialEntity(data), traceId);
    if (!role_group) return null;

    return toPartialDomain(role_group);
  }
  
  async delete(id: number, traceId?: string): Promise<boolean> {
    logger.info(this.delete.name, RoleGroupMySQLAdapter.name, traceId);
    return await this.RoleGroupSqlRepository.delete(id, traceId);
  }
  
}