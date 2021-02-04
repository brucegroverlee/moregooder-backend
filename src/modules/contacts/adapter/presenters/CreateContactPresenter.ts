import { ICreateContactResponseModel  } from "../../useCases/createContact/createContact";
import { IContact } from "../../entities/IContact";
import { ViewModel } from "../../../shared/adapters/viewModel/ViewModel";

export class CreateContactPresenter implements ICreateContactResponseModel {
  constructor(private viewModel: ViewModel) {}

  resolve(contact: IContact): void {
    this.viewModel.resolveCreated201(contact);
  }
}