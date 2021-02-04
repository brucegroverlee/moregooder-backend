import { FirestoreContactsRepository } from "./FirestoreContactsRepository";
import { firestore } from "../../../../frameworks/firestore/firestore";

export class ContactsRepositoryFactory {
  static getRepository() {
    return new FirestoreContactsRepository(firestore);
  }
}