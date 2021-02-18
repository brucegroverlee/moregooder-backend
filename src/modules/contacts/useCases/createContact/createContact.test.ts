/* tslint:disable:max-classes-per-file */
import {
  createContact,
  ICreateContactRequestModel,
  ICreateContactResponseModel,
} from "./createContact";
import { IContactsExternalService } from "../ports";
import { RepositoryMockFactory } from "../../../shared/__mocks__/Repository.mock";
import { IContact } from "../../entities/IContact";

class ContactsExternalServices implements IContactsExternalService {
  async create(contact: IContact): Promise<void> {
    return;
  }
}

class CreatePersonPresenter implements ICreateContactResponseModel {
  result: any;

  resolve(person: IContact): void {
    this.result = person;
  }
}

describe("CreatePerson useCase", () => {
  it("should create a new person", async () => {
    const presenter = new CreatePersonPresenter();
    const request: ICreateContactRequestModel = {
      workspaceId: 10,
      name: "Fake Name",
      email: "Fake email",
    };
    await createContact(
      RepositoryMockFactory.getRepository(),
      new ContactsExternalServices(),
      presenter
    )(request);

    expect(typeof presenter.result).toBe("object");
    expect(presenter.result.name).toBe("Fake Name");
  });
});