import { FirestoreUsersRepository } from "./FirestoreUsersRepository";
import { firestore } from "../../../../frameworks/firestore/firestore";

export class UsersRepositoryFactory {
  static getRepository() {
    return new FirestoreUsersRepository(firestore);
  }
}