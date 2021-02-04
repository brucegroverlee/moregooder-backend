import { FirestoreBaseRepository } from "../../../shared/adapters/gateways/FirestoreBaseRepository";
import { IContact } from "../../entities/IContact";
import { IContactsRepository } from "../../useCases/sharedPorts/IContactsRepository";
import config from "../../../../frameworks/config";

export class FirestoreContactsRepository extends FirestoreBaseRepository<IContact> implements IContactsRepository {
  readonly tableName: string = config.firestore.FIRESTORE_CONTACTS_COLLECTION;

  create(values: { name: string; email: string; country: string; }): Promise<IContact> {
    try {
      return super._create(values);
    } catch (error) {
      throw error;
    }
  }
}