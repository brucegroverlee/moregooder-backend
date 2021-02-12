import { IContactsRepository } from "../ports";
import { IContact } from "../../entities/IContact";

export interface ICreateContactResponseModel {
  resolve(contact: IContact): void;
}

export interface ICreateContactRequestModel {
  name: string;
  email: string;
  country: string;
}

export function createContact(
  contactsRepository: IContactsRepository,
  presenter: ICreateContactResponseModel
) {
  return async (request: ICreateContactRequestModel): Promise<void> => {
    try {
      const newContact = await contactsRepository.create(request);
      presenter.resolve(newContact);
      return;
    } catch (error) {
      throw error;
    }
  };
}
