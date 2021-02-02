import { FirestoreBaseRepository } from "../../../shared/adapters/gateways/FirestoreBaseRepository";
import { IUsers } from "../../entities/IUsers";
import { IUsersRepository } from "../../useCases/sharedPorts/IUsersRepository";

export class FirestoreUsersRepository extends FirestoreBaseRepository<IUsers> implements IUsersRepository {
  readonly tableName: string = "users";

  create(values: { name: string; email: string; password: string; }): Promise<IUsers> {
    try {
      return super._create(values);
    } catch (error) {
      throw error;
    }
  }
}