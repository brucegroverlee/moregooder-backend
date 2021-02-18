import { IContact } from "../entities/IContact";
import { IRepositories } from "../../shared/useCases/ports/IRepositories";
import { IDType } from "../../shared/entities/types";

export interface IContactsRepository extends IRepositories<IContact> {
  create(values: {
    workspaceId: IDType;
    name: string;
    email: string;
  }): Promise<IContact>;
}

export interface IContactsExternalService {
  create(contact: IContact): Promise<void>;
}