import { IDType } from "../../shared/entities/types";
import { IContact } from "./IContact";

export class Contact implements IContact {
  id: IDType;
  name: string;
  email: string;
  country: string;
  createdAt: string;
  updatedAt: string;

  constructor(values: {
    id: IDType,
    name: string,
    email: string,
    country: string,
    createdAt: string,
    updatedAt: string,
  }) {
    this.id = values.id;
    this.name = values.name;
    this.email = values.name;
    this.country = values.name;
    this.createdAt = values.createdAt;
    this.updatedAt = values.updatedAt;
  }
}