import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseSearchRequest } from '../../core/base-search-request';
import { BaseDto } from '../../core/base.dto';
import { GenericResponse } from '../../core/generic-response'; import { BaseSearchResponse } from '../../core/search-response';
export class StatDto extends BaseDto {
  @ApiProperty()
  label?: string;
  @ApiProperty()
  value: number;
}

export class GetStatResponse extends GenericResponse {
  @ApiProperty({ type: () => StatDto })
  stat: StatDto;
}

export class GetStatsResponse extends BaseSearchResponse {
  @ApiProperty({ type: () => StatDto, isArray: true })
  stats: StatDto[] = [];
}

export class GetStatsRequest extends BaseSearchRequest {
  @ApiPropertyOptional({ description: 'Label of the stat requested' })
  label?: string;
}
