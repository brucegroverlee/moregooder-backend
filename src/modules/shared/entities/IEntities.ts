import { IDType } from "./types";

export interface IEntities {
  [key: string]: any;
  id: IDType;
  workspaceId: IDType;
  createdAt: string;
  updatedAt: string;
}