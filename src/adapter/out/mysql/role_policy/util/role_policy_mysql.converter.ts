import { RolePolicy } from "@domain/role_policy";
import { RolePolicyMySQLEntity } from "../entity/role_policy_mysql.entity";

export const toDomain = (entity: RolePolicyMySQLEntity): RolePolicy => {
  return {
    id: entity.id,
    type: entity.type,
    name: entity.name,
    path: entity.path,
    action: entity.action,
    desc: entity.desc,
    moduleId: entity.module_id,
    basePath: entity.base_path,
  };
};

export const toEntity = (domain: RolePolicy): RolePolicyMySQLEntity => {
  return {
    id: domain.id,
    type: domain.type,
    name: domain.name,
    path: domain.path,
    action: domain.action,
    desc: domain.desc,
    module_id: domain.moduleId,
    base_path: domain.basePath,
  };
};

export const toPartialDomain = (entity: Partial<RolePolicyMySQLEntity>): Partial<RolePolicy> => {
  return {
    id: entity.id,
    type: entity.type,
    name: entity.name,
    path: entity.path,
    action: entity.action,
    desc: entity.desc,
    moduleId: entity.module_id,
    basePath: entity.base_path,
    undefined: entity.created_at,
    undefined: entity.updated_at,
  };
};

export const toPartialEntity = (domain: Partial<RolePolicy>): Partial<RolePolicyMySQLEntity> => {
  return {
    id: domain.id,
    type: domain.type,
    name: domain.name,
    path: domain.path,
    action: domain.action,
    desc: domain.desc,
    module_id: domain.moduleId,
    base_path: domain.basePath,
  };
};
