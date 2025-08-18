import { COMMON } from "@domain/constant"
import { Filter } from "@domain/filter"
import { Request } from "express"

export const queryToFilter = (req: Request): Filter => {
  return {
    perPage: req.query.perPage !== undefined && req.query.perPage !== '' ? parseInt(req.query.perPage.toString()) : undefined,
    currentPage: req.query.page !== undefined && req.query.page !== '' ? parseInt(req.query.page.toString()) : undefined,
    query: req.query.q !== undefined ? req.query.q as string : '',
    sortBy: req.query.sortBy !== undefined ? req.query.sortBy as string : undefined,
    sortOrder: req.query.sortOrder !== undefined ? (req.query.sortOrder === COMMON.ASC || req.query.sortOrder === '1' ? COMMON.ASC : (req.query.sortOrder === COMMON.DESC || req.query.sortOrder === '-1' ? COMMON.DESC : parseInt(req.query.sortOrder as string))) : undefined,
    isActive: req.query.isActive !== undefined ? req.query.isActive === 'true' : undefined,
  }
}