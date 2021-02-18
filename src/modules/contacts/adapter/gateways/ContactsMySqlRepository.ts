import { MySqlBaseRepository } from "../../../shared/adapters/gateways/MySqlBaseRepository";
import { IDType } from "../../../shared/entities/types";
import { IContact } from "../../entities/IContact";
import { IContactsRepository } from "../../useCases/ports";

export class ContactsMySqlRepository extends MySqlBaseRepository<IContact> implements IContactsRepository {
  readonly tableName: string = "contacts";

  create(values: { workspaceId: IDType, name: string; email: string; }): Promise<IContact> {
    try {
      return super._create(values);
    } catch (error) {
      throw error;
    }
  }
}