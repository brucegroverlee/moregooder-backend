/* tslint:disable:max-classes-per-file */
import { IContact } from "modules/contacts/entities/IContact";
import { IContactsExternalService } from "../../useCases/ports";
import { ContactsIntercomService } from "./ContactsIntercomService";

export class ContactsExternalServices implements IContactsExternalService {
  private contactsIntercomService: ContactsIntercomService;

  constructor() {
    this.contactsIntercomService = new ContactsIntercomService();
  }

  async create(contact: IContact): Promise<void> {
    try {
      await this.contactsIntercomService.create(contact);
      return;
    } catch (error) {
      throw error;
    }
  }
}

export class ContactsExternalServicesFactory {
  static getServices() {
    return new ContactsExternalServices();
  }
}