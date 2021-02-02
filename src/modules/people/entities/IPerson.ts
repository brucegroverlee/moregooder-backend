import { IEntities } from "../../shared/entities/IEntities";
import { IDType } from "../../shared/entities/types";

export interface IPerson extends IEntities {
  name: string;
  createdBy: IDType;
}