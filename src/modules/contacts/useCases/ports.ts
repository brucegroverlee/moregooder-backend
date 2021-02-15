import { IContact } from "../entities/IContact";
import { IRepositories } from "../../shared/useCases/ports/IRepositories";

export interface IContactsRepository extends IRepositories<IContact> {
  create(values: {
    name: string;
    email: string;
    country: string;
  }): Promise<IContact>;
}

export interface IContactsExternalService {
  create(contact: IContact): Promise<void>;
}