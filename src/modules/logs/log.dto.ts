import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseSearchRequest } from '../../core/base-search-request';
import { BaseDto } from '../../core/base.dto';
import { GenericResponse } from '../../core/generic-response';
import { BaseSearchResponse } from '../../core/search-response';

export class LogDto extends BaseDto {
  @ApiProperty()
  code?: string;
  @ApiProperty()
  dbError: string;
}

export class GetLogResponse extends GenericResponse {
  @ApiProperty({ type: () => LogDto })
  log: LogDto;
}

export class GetLogsResponse extends BaseSearchResponse {
  @ApiProperty({ type: () => LogDto, isArray: true })
  logs: LogDto[] = [];
}

export class GetLogsRequest extends BaseSearchRequest {
  @ApiPropertyOptional({ description: 'Search by code' })
  code?: string;
}
