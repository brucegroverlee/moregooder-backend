import { IContactsRepository, IContactsExternalService } from "../ports";
import { IContact } from "../../entities/IContact";

export interface ICreateContactResponseModel {
  resolve(contact: IContact): void;
}

export interface ICreateContactRequestModel {
  name: string;
  email: string;
}

export function createContact(
  contactsRepository: IContactsRepository,
  contactsExternalServices: IContactsExternalService,
  presenter: ICreateContactResponseModel
) {
  return async (request: ICreateContactRequestModel): Promise<void> => {
    try {
      const newContact = await contactsRepository.create(request);
      await contactsExternalServices.create(newContact);
      presenter.resolve(newContact);
      return;
    } catch (error) {
      throw error;
    }
  };
}
