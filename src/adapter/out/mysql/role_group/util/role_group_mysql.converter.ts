import { RoleGroup } from "@domain/role_group";
import { RoleGroupMySQLEntity } from "../entity/role_group_mysql.entity";

export const toDomain = (entity: RoleGroupMySQLEntity): RoleGroup => {
  return {
    id: entity.id,
    roleId: entity.role_id,
    roleName: entity.role_name,
    remark: entity.remark,
    profitSharing: entity.profit_sharing,
  };
};

export const toEntity = (domain: RoleGroup): RoleGroupMySQLEntity => {
  return {
    id: domain.id,
    role_id: domain.roleId,
    role_name: domain.roleName,
    remark: domain.remark,
    profit_sharing: domain.profitSharing,
  };
};

export const toPartialDomain = (entity: Partial<RoleGroupMySQLEntity>): Partial<RoleGroup> => {
  return {
    id: entity.id,
    roleId: entity.role_id,
    roleName: entity.role_name,
    remark: entity.remark,
    profitSharing: entity.profit_sharing,
  };
};

export const toPartialEntity = (domain: Partial<RoleGroup>): Partial<RoleGroupMySQLEntity> => {
  return {
    id: domain.id,
    role_id: domain.roleId,
    role_name: domain.roleName,
    remark: domain.remark,
    profit_sharing: domain.profitSharing,
  };
};
