import { FirestoreBaseRepository } from "../../../shared/adapters/gateways/FirestoreBaseRepository";
import { IPerson } from "../../entities/IPerson";
import { IPeopleRepository } from "../../useCases/sharedPorts/IPeopleRepository";
import { IDType } from "../../../shared/entities/types";

export class FirestorePeopleRepository extends FirestoreBaseRepository<IPerson> implements IPeopleRepository {
  readonly tableName: string = "people";

  create(values: { name: string; createdBy: IDType; }): Promise<IPerson> {
    try {
      return super._create(values);
    } catch (error) {
      throw error;
    }
  }
}