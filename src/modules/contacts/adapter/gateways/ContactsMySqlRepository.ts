import { MySqlBaseRepository } from "../../../shared/adapters/gateways/MySqlBaseRepository";
import { IContact } from "../../entities/IContact";
import { IContactsRepository } from "../../useCases/ports";

export class ContactsMySqlRepository extends MySqlBaseRepository<IContact> implements IContactsRepository {
  readonly tableName: string = "contacts";

  create(values: { name: string; email: string; }): Promise<IContact> {
    try {
      return super._create(values);
    } catch (error) {
      throw error;
    }
  }
}