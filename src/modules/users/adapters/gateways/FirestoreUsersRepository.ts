import { FirestoreBaseRepository } from "../../../shared/adapters/gateways/FirestoreBaseRepository";
import { IUsers } from "../../entities/IUsers";
import { IUsersRepository } from "../../useCases/sharedPorts/IUsersRepository";
import config from "../../../../frameworks/config";

export class FirestoreUsersRepository extends FirestoreBaseRepository<IUsers> implements IUsersRepository {
  readonly tableName: string = config.firestore.FIRESTORE_USERS_COLLECTION;

  create(values: { name: string; email: string; password: string; }): Promise<IUsers> {
    try {
      return super._create(values);
    } catch (error) {
      throw error;
    }
  }
}