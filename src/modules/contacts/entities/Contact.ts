import { IDType } from "../../shared/entities/types";
import { IContact } from "./IContact";

export class Contact implements IContact {
  id: IDType;
  workspaceId: IDType;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;

  constructor(values: {
    id: IDType,
    workspaceId: IDType,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string,
  }) {
    this.id = values.id;
    this.workspaceId = values.workspaceId;
    this.name = values.name;
    this.email = values.name;
    this.createdAt = values.createdAt;
    this.updatedAt = values.updatedAt;
  }
}