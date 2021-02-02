import { IDType } from "../../shared/entities/types";
import { IPerson } from "./IPerson";

export class Person implements IPerson {
  id: IDType;
  name: string;
  createdBy: IDType;
  createdAt: string;
  updatedAt: string;

  constructor(values: {
    id: IDType,
    name: string,
    createdAt: string,
    updatedAt: string,
  }) {
    this.id = values.id;
    this.name = values.name;
    this.createdAt = values.createdAt;
    this.updatedAt = values.updatedAt;
  }
}