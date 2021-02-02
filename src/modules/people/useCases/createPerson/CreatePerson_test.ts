import { CreatePerson } from "./CreatePerson";
import { RepositoryMockFactory } from "../../../shared/__mocks__/Repository.mock";
import { ICreatePersonRequestModel } from "./ports/ICreatePersonRequestModel";
import { ICreatePersonResponseModel } from "./ports/ICreatePersonResponseModel";
import { IPerson } from "../../entities/IPerson";

class CreatePersonPresenter implements ICreatePersonResponseModel {
  result: any;

  resolve(person: IPerson): void {
    this.result = person;
  }
}

describe("CreatePerson useCase", () => {
  it("should create a new person", async () => {
    const presenter = new CreatePersonPresenter();
    const request: ICreatePersonRequestModel = {
      user: {
        userId: 10,
      },
      data: {
        name: "Fake Name",
      },
    };
    const createPerson = new CreatePerson(
      RepositoryMockFactory.getRepository(),
      presenter
    );
    await createPerson.execute(request);
    expect(typeof presenter.result).toBe("object");
    expect(presenter.result.id).toBe(1);
    expect(presenter.result.name).toBe("Fake Name");
    expect(presenter.result.createdBy).toBe(10);
  });
});