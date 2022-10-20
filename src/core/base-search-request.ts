import { ApiProperty } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
export class BaseSearchRequest {
  @ApiProperty({
    description: 'The start of the request',
    required: false,
    type: Number,
  })
  start?: number;
  @ApiProperty({
    description: 'The length of the request',
    required: false,
    type: Number,
  })
  length?: number;
  @ApiProperty({
    description: 'order by field',
    required: false,
    type: String,
  })
  orderby?: string;
  @ApiProperty({
    description: 'order direction (asc | desc)',
    required: false,
    type: String,
  })
  order?: 'asc' | 'desc';

  @ApiProperty({
    description: 'Search',
    required: false,
    type: String,
  })
  search?: string;

  public static getDefaultFindOptions<T>(
    request: BaseSearchRequest,
    orderbyExcepts: string[] = [],
  ): FindManyOptions<T> {
    if (!request) request = {};
    if (!request.start || typeof request.start === 'object') request.start = 0;
    if (!request.length || typeof request.length === 'object')
      request.length = 1000;
    let orderObject: any;
    if (request.order && request.orderby) {
      orderObject = {};
      if (!orderbyExcepts || orderbyExcepts.indexOf(request.orderby) === -1)
        orderObject[request.orderby] = request.order.toUpperCase();
    }
    return {
      take: request.length,
      skip: request.start,
      order: orderObject,
    };
  }
}
