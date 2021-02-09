import { IContactsRepository } from "../sharedPorts/IContactsRepository";
import { IContact } from "../../entities/IContact";

export interface IGetContactsResponseModel {
  resolve(contact: IContact): void;
}

export interface IGetContactsRequestModel {
  query: {
    name?: string;
    email?: string;
    country?: string;
  };
  pagination: {
    page?: number;
    perPage?: number;
    since?: string;
    until?: string;
  };
}

export function getContacts(
  contactsRepository: IContactsRepository,
  presenter: IGetContactsResponseModel
) {
  return async (request: IGetContactsRequestModel): Promise<void> => {
    try {
      const newContact = await contactsRepository;
      presenter.resolve(newContact);
      return;
    } catch (error) {
      throw error;
    }
  };
}
