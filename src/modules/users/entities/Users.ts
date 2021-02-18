import { IDType } from "../../shared/entities/types";
import { IUsers } from "./IUsers";

export class Users implements IUsers {
  id: IDType;
  workspaceId: IDType;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;

  constructor(values: {
    id: IDType,
    workspaceId: IDType,
    name: string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string,
  }) {
    this.id = values.id;
    this.workspaceId = values.workspaceId;
    this.name = values.name;
    this.email = values.email;
    this.password = values.password;
    this.createdAt = values.createdAt;
    this.updatedAt = values.updatedAt;
  }
}
