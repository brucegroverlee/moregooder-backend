import { MySqlBaseRepository } from "../../../shared/adapters/gateways/MySqlBaseRepository";
import { IUsers } from "../../entities/IUsers";
import { IUsersRepository } from "../../useCases/sharedPorts/IUsersRepository";

export class UsersMySqlRepository extends MySqlBaseRepository<IUsers> implements IUsersRepository {
  readonly tableName: string = "users";

  create(values: { name: string; email: string; password: string; }): Promise<IUsers> {
    try {
      return super._create(values);
    } catch (error) {
      throw error;
    }
  }
}