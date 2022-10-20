import { List } from 'linqts';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ApplicationBaseService } from './base-service';
import { GenericResponse } from './generic-response';
import { BaseSearchResponse } from './search-response';

interface LinqRelation<X> {
  include: (x: X) => any;
  child?: LinqRelation<any>;
}

interface ModelOptions<X, Y, Z> {
  entity: new () => X;
  repository: Repository<X>;
  getOneResponse: new () => Y;
  getManyResponse: new () => Z;
  getManyResponseField: string;
  getOneResponseField: string;
  getManyRelations?: string[];
  getOneRelations?: string[];
  getOneRelationsLinq?: LinqRelation<X>[];
  getManyRelationsLinq?: LinqRelation<X>[];
  archiveField?: string;
  archiveFieldValue?: boolean;
}

export abstract class ApplicationBaseModelService<
  X extends {
    id: string | number;
    toDto: (...args: any) => any;
    fromDto: (dto: XDTO) => any;
  } = undefined,
  XDTO extends { id?: string | number; } = undefined,
  Y extends GenericResponse = undefined,
  Z extends BaseSearchResponse = undefined
> extends ApplicationBaseService {
  public modelOptions: ModelOptions<X, Y, Z>;
  constructor() {
    super();
    this.checkModelOptions();
  }

  private checkModelOptions() {
    if (
      !this.modelOptions ||
      !this.modelOptions.entity ||
      !this.modelOptions.getManyResponseField ||
      !this.modelOptions.getOneResponseField
    ) {
      return false;
    }
    if (typeof this.modelOptions.archiveField === 'undefined')
      this.modelOptions.archiveField = 'archived';
    if (typeof this.modelOptions.archiveFieldValue === 'undefined')
      this.modelOptions.archiveFieldValue = true;
    return true;
  }

  async findOne(
    conditions?: FindOneOptions<X>,
    ...toDtoParameters: any
  ): Promise<Y> {
    if (!this.checkModelOptions()) return null;
    const response = new this.modelOptions.getOneResponse();
    try {
      if (!conditions) conditions = {};
      let entity: X;
      const useNewLinqRepo = !!(conditions as any).query;
      const relations: string[] = [];
      if (this.modelOptions.getOneRelations)
        relations.push(
          ...new List(this.modelOptions.getOneRelations).Distinct().ToArray(),
        );
      conditions = conditions as FindOneOptions<X>;
      if (!conditions.relations) conditions.relations = [];
      conditions.relations = new List([...conditions.relations as [], ...relations])
        .Distinct()
        .ToArray();
      entity = await this.modelOptions.repository.findOne(conditions);
      if (entity) {
        response[this.modelOptions.getOneResponseField] = entity.toDto(
          ...toDtoParameters,
        );
      }
      response.success = true;
    } catch (err) {
      response.handleError(err);
    }
    return response;
  }

  async findAll(
    conditions?: FindManyOptions<X>,
    ...toDtoParameters: any
  ): Promise<Z> {
    if (!this.checkModelOptions()) return null;
    const response = new this.modelOptions.getManyResponse();
    try {
      if (!conditions) conditions = {};
      let entities: X[];
      response.filteredResults = await this.modelOptions.repository.count(
        conditions as FindManyOptions<X>,
      );

      if (response.filteredResults === 0) {
        response.success = true;
        return response;
      }
      const relations: string[] = [];
      if (this.modelOptions.getManyRelations)
        relations.push(
          ...new List(this.modelOptions.getManyRelations)
            .Distinct()
            .ToArray(),
        );
      conditions = conditions as FindManyOptions<X>;
      if (!conditions.relations) conditions.relations = [];
      conditions.relations = new List([...conditions.relations as [], ...relations])
        .Distinct()
        .ToArray();
      entities = await this.modelOptions.repository.find(conditions);
      if (entities)
        response[this.modelOptions.getManyResponseField] = entities.map(x =>
          x.toDto(...toDtoParameters),
        );
      response.success = true;
    } catch (err) {
      response.handleError(err);
    }
    return response;
  }

  async createOrUpdate(dto: XDTO, ...toDtoParameters: any): Promise<Y> {
    if (!this.checkModelOptions()) return null;
    const response = new this.modelOptions.getOneResponse();
    try {
      let entity: X;
      if (!!dto.id)
        entity = await this.modelOptions.repository.findOne({
          where: { id: dto.id },
        } as FindOneOptions<X>);
      if (!entity) {
        entity = new this.modelOptions.entity();
      }
      entity.fromDto(dto);
      const entitySaved = await this.modelOptions.repository.save(
        entity as any,
      );
      entity = await this.modelOptions.repository.findOne({
        where: { id: entitySaved.id },
        relations: this.modelOptions.getOneRelations,
      } as FindOneOptions<X>);
      response[this.modelOptions.getOneResponseField] = entity.toDto(
        ...toDtoParameters,
      );
      response.success = true;
    } catch (err) {
      response.handleError(err);
    }
    return response;
  }

  public async delete(ids: string[]) {
    if (!this.checkModelOptions()) return null;
    const response = new GenericResponse();
    try {
      if (ids && ids.length > 0) {
        await this.modelOptions.repository.delete(ids);
      }
      response.success = true;
    } catch (err) {
      response.handleError(err);
    }
    return response;
  }

  public async deleteOne(id: string) {
    if (!this.checkModelOptions()) return null;
    const response = new GenericResponse();
    try {
      await this.modelOptions.repository.delete(id);
      response.success = true;
    } catch (err) {
      response.handleError(err);
    }
    return response;
  }
}
