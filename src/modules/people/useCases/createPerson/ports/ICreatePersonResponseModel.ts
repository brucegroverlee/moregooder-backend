import { IPerson } from "../../../entities/IPerson";

export interface ICreatePersonResponseModel {
  resolve(person: IPerson): void;
}