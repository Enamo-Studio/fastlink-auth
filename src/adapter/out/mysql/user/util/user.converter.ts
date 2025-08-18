import { User } from "@domain/user";
import { UserSqlEntity } from "../entity/user_sql.entity";

export const toDomain = (entity: UserSqlEntity): User => {
  return {
    id: entity.id,
    email: entity.email,
    password: entity.password,
    name: entity.name,
    phone: entity.phone,
    address: entity.address,
    image: entity.image,
    roleId: entity.role_id,
    isActive: entity.is_active,
    dateCreated: entity.date_created,
    gender: entity.gender,
    noServices: entity.no_services,
    lang: entity.lang,
    codephone: entity.codephone
  };
}

export const toEntity = (domain: User): UserSqlEntity => {
  return {
    id: domain.id,
    email: domain.email,
    password: domain.password,
    name: domain.name,
    phone: domain.phone,
    address: domain.address,
    image: domain.image,
    role_id: domain.roleId,
    is_active: domain.isActive,
    date_created: domain.dateCreated,
    gender: domain.gender,
    no_services: domain.noServices,
    lang: domain.lang,
    codephone: domain.codephone
  };
}

export const toPartialDomain = (entity: Partial<UserSqlEntity>): Partial<User> => {
  return {
    email: entity.email,
    name: entity.name,
    phone: entity.phone,
    address: entity.address,
    image: entity.image,
    roleId: entity.role_id,
    isActive: entity.is_active,
    dateCreated: entity.date_created,
    gender: entity.gender,
    noServices: entity.no_services,
    lang: entity.lang,
    codephone: entity.codephone
  };
}

export const toPartialEntity = (domain: Partial<User>): Partial<UserSqlEntity> => {
  return {
    email: domain.email,
    name: domain.name,
    phone: domain.phone,
    address: domain.address,
    image: domain.image,
    role_id: domain.roleId,
    is_active: domain.isActive,
    date_created: domain.dateCreated,
    gender: domain.gender,
    no_services: domain.noServices,
    lang: domain.lang,
    codephone: domain.codephone
  };
}