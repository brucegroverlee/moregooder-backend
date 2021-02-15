import axios from "axios";
import { IContact } from "modules/contacts/entities/IContact";
import { IContactsExternalService } from "../../useCases/ports";
import config from "../../../../frameworks/config";

export class ContactsIntercomService implements IContactsExternalService {
  async create(contact: IContact): Promise<any> {
    try {
      const response = await axios({
        method: "POST",
        headers: {
          "Authorization": `Bearer ${config.intercom.ACCESS_TOKEN}`,
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        url: "https://api.intercom.io/contacts",
        data: {
          "role": "user",
          "external_id": contact.id,
          "email": contact.email,
          "name": contact.name,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}