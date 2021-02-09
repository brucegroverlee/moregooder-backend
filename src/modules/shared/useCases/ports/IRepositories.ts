import { IEntities } from "../../entities/IEntities";
import { IDType } from "../../entities/types";

export interface IRepositories<T extends IEntities>{
  create?(values: object): Promise<T>;
  findOne(query: object): Promise<T|null>;
  findById(id: IDType): Promise<T|null>;
  findAndCountAll(
    query: any,
    pagination: {
      page: number,
      perPage: number
  }): Promise<{ count: number, rows: T[] }>;
  isAvailable(query: object): Promise<boolean>;
  delete(query: object): Promise<number>;
  /*
  
  update(where: any, values: any): IRepositories[];
  */
}