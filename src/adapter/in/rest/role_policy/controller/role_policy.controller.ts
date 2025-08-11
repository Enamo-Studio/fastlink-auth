import { BaseController } from "@common/base_controller";
import { Express, Request, Response } from "express";
import { queryToFilter } from "../util/role_policy.converter";
import { getLogTraceId } from "@logger";
import { dataToRestResponse } from "@util/converter/global_converter";
import { errorHandler } from "@util/error/error_handler";
import { globalAuthMiddleware } from "@util/middlewares/global_auth";
import { IRolePolicyUseCase } from "@use_case/role_policy.use_case";
import { RolePolicyService } from "@service/role_policy.service";

export class RolePolicyRestController implements BaseController {
  private app: Express;
  private readonly prefix: string = "/role-policies";
  private service: IRolePolicyUseCase;

  constructor(app: Express) {
    this.app = app;
    this.service = new RolePolicyService();
  }

  init(): void {
    this.app.get(this.prefix, globalAuthMiddleware, this.getAll.bind(this));
    this.app.get(this.prefix + '/:id', globalAuthMiddleware, this.getById.bind(this));
    this.app.post(this.prefix, globalAuthMiddleware, this.create.bind(this));
    this.app.put(this.prefix + '/:id', globalAuthMiddleware, this.update.bind(this));
    this.app.delete(this.prefix + '/:id', globalAuthMiddleware, this.delete.bind(this));
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const filter = queryToFilter(req);
      const traceId = getLogTraceId();
      const data = await this.service.getAll(filter.currentPage, filter.perPage, filter, traceId)

      res.json(dataToRestResponse(data.data, data.stats));
      
    } catch (error) {
      errorHandler(error, res)
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.getById(parseInt(req.params.id.toString()), getLogTraceId());
      res.json(dataToRestResponse(data));
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.create(req.body, getLogTraceId());
      res.status(201).json(dataToRestResponse(data));
    } catch (error) {
      errorHandler(error, res);
    }
  }
  async update(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.update(parseInt(req.params.id.toString()), req.body, getLogTraceId());
      res.json(dataToRestResponse(data));
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.service.delete(parseInt(req.params.id.toString()), getLogTraceId());
      res.json(dataToRestResponse(result));
    } catch (error) {
      errorHandler(error, res);
    }
  }
}