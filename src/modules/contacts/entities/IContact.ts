import { IEntities } from "../../shared/entities/IEntities";

export interface IContact extends IEntities {
  name: string;
  email: string;
  country: string;
}