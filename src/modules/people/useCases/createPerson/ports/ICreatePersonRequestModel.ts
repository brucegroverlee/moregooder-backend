import { IDType } from "../../../../shared/entities/types";

export interface ICreatePersonRequestModel {
  user: {
    userId: IDType;
  };
  data: {
    name: string;
  };
}