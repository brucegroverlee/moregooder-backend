import { Request, Response, NextFunction } from "express";
import { createContact } from "../../useCases/createContact/createContact";
import { IContactsRepository } from "../../useCases/ports";
import { ICreateContactRequestModel } from "../../useCases/createContact/createContact";
import { CreateContactPresenter } from "../presenters/CreateContactPresenter";
import { ViewModel } from "../../../shared/adapters/viewModel/ViewModel";
import { ContactsRepositoryFactory } from "../gateways/ContactsRepositoryFactory";

// tslint:disable-next-line:no-shadowed-variable
export const controller = (peopleRepository: IContactsRepository) => {
  return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { body } = request;
      const requestModel: ICreateContactRequestModel = {
        name: body.name,
        email: body.email,
        country: body.country,
      };
      const viewModel = new ViewModel(response);
      const presenter = new CreateContactPresenter(viewModel);
      await createContact(peopleRepository, presenter)(requestModel);
    } catch (error) {
      next(error);
    }
  }
}

export const createContactController = controller(ContactsRepositoryFactory.getRepository());