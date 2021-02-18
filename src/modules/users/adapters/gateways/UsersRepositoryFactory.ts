import { UsersMySqlRepository } from "./UsersMySqlRepository";
import { db } from "../../../../frameworks/mysql/mysql";

export class UsersRepositoryFactory {
  static getRepository() {
    return new UsersMySqlRepository(db);
  }
}