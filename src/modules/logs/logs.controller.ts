import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Like } from 'typeorm';
import { BaseSearchRequest } from '../../core/base-search-request';
import { BaseController } from '../../core/base.controller';
import { GenericResponse } from '../../core/generic-response';
import { AllowRoles } from '../../decorators/allow-roles.decorator';
import { ApiDocs } from '../../decorators/api.decorator';
import { UserLogged } from '../../decorators/user-logged.decorator';
import { RolesList } from '../../types/enums';
import { GetLogsRequest, GetLogsResponse } from './log.dto';
import { Log } from './log.entity';
import { LogsService } from './logs.service';

@ApiTags('logs')
@Controller('logs')
export class LogsController extends BaseController {
  constructor(private readonly logService: LogsService) {
    super();
  }

  @Get()
  @AllowRoles(RolesList.Admin)
  @ApiDocs({
    summary: 'Get all logs',
    operationId: 'getAllLogs',
    resStatus: HttpStatus.OK,
    resType: GetLogsResponse,
  })
  async getAll(@Body() request: GetLogsRequest): Promise<GetLogsResponse> {
    const findOptions = BaseSearchRequest.getDefaultFindOptions<Log>(request);
    if (request.search) {
      if (!findOptions.where) findOptions.where = [{}];
      findOptions.where = [{ code: Like('%' + request.code + '%') }];
    }
    return await this.logService.findAll(findOptions);
  }

  @Delete()
  @UserLogged()
  @ApiDocs({
    summary: 'Delete logs',
    operationId: 'deleteLogs',
    resStatus: HttpStatus.OK,
    resType: GenericResponse,
  })
  async delete(@Query('logIds') logIds: string): Promise<GenericResponse> {
    return await this.logService.delete(logIds.split(','));
  }
}
