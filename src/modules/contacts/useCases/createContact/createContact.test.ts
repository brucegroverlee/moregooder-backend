import { createContact } from "./createContact";
import { RepositoryMockFactory } from "../../../shared/__mocks__/Repository.mock";
import { ICreateContactRequestModel } from "./createContact";
import { ICreateContactResponseModel } from "./createContact";
import { IContact } from "../../entities/IContact";

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
      name: "Fake Name",
      email: "Fake email",
      country: "Fake country",
    };
    await createContact(
      RepositoryMockFactory.getRepository(),
      presenter
    )(request);

    expect(typeof presenter.result).toBe("object");
    expect(presenter.result.name).toBe("Fake Name");
  });
});