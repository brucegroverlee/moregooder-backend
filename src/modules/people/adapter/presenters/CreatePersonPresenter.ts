import { ICreatePersonResponseModel  } from "../../useCases/createPerson/ports/ICreatePersonResponseModel";
import { IPerson } from "../../entities/IPerson";
import { ViewModel } from "../../../shared/adapters/viewModel/ViewModel";

export class CreatePersonPresenter implements ICreatePersonResponseModel {
  private readonly RESOLVE_STATUS_CODE: number = 200;

  constructor(private viewModel: ViewModel) {}

  resolve(person: IPerson): void {
    this.viewModel.resolve(this.RESOLVE_STATUS_CODE, person);
  }
}