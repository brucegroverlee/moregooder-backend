import { FirestorePeopleRepository } from "./FirestorePeopleRepository";
import { firestore } from "../../../../frameworks/firestore/firestore";

export class PeopleRepositoryFactory {
  static getRepository() {
    return new FirestorePeopleRepository(firestore);
  }
}