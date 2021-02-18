import { ContactsMySqlRepository } from "./ContactsMySqlRepository";
import { db } from "../../../../frameworks/mysql/mysql";

export class ContactsRepositoryFactory {
  static getRepository() {
    return new ContactsMySqlRepository(db);
  }
}