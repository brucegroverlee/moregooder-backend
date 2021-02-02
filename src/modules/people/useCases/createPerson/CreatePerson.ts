import { IPeopleRepository } from "../sharedPorts/IPeopleRepository";
import { ICreatePersonResponseModel } from "./ports/ICreatePersonResponseModel";
import { ICreatePersonRequestModel } from "./ports/ICreatePersonRequestModel";

export class CreatePerson {
  constructor(
    private peopleRepository: IPeopleRepository,
    private presenter: ICreatePersonResponseModel
  ) {}

  async execute(request: ICreatePersonRequestModel): Promise<void> {
    try {
      const { user, data } = request;
      const person = await this.peopleRepository.create({
        name: data.name,
        createdBy: user.userId,
      });
      this.presenter.resolve(person);
      return;
    } catch (error) {
      throw error;
    }
  }
}