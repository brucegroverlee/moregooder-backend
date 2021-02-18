import { IEntities } from "../../entities/IEntities";
import { IDType } from "../../entities/types";

export interface IRepositories<T extends IEntities>{
  create?(values: object): Promise<T>;
  findAll(
    query: object,
    options: {
      sort?: string;
      timeRange?: {
        since: string;
        until: string;
      };
      pagination?: {
        page: number;
        perPage: number;
      };
    }
  ): Promise<T[]|number>;
  findOne(query: object): Promise<T|null>;
  findById(id: IDType): Promise<T|null>;
  findAndCountAll(
    query: any,
    options: {
      sort?: string;
      timeRange?: {
        since: string;
        until: string;
      };
      pagination?: {
        page: number;
        perPage: number;
      };
    }
  ): Promise<{ count: number, rows: T[] }>;
  isAvailable(query: object): Promise<boolean>;
  delete(query: object): Promise<number>;
  /*  update(where: any, values: any): IRepositories[]; */
}