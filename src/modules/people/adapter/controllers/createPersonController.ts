import { Request, Response, NextFunction } from "express";
import { CreatePerson } from "../../useCases/createPerson/CreatePerson";
import { IPeopleRepository } from "../../useCases/sharedPorts/IPeopleRepository";
import { ICreatePersonRequestModel } from "../../useCases/createPerson/ports/ICreatePersonRequestModel";
import { CreatePersonPresenter } from "../presenters/CreatePersonPresenter";
import { ViewModel } from "../../../shared/adapters/viewModel/ViewModel";
import { IAuthenticatedRequest } from "../../../shared/adapters/requestModel/AuthenticatedRequestModel";
import { PeopleRepositoryFactory } from "../gateways/PeopleRepositoryFactory";

// tslint:disable-next-line:no-shadowed-variable
export const controller = (peopleRepository: IPeopleRepository) => {
  return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { user, body } = request as IAuthenticatedRequest;
      const requestModel: ICreatePersonRequestModel = {
        user,
        data: body,
      };
      const viewModel = new ViewModel(response);
      const presenter = new CreatePersonPresenter(viewModel);
      const createPerson = new CreatePerson(peopleRepository, presenter);
      await createPerson.execute(requestModel);
    } catch (error) {
      next(error);
    }
  }
}

export const createPersonController = controller(PeopleRepositoryFactory.getRepository());