import { Request, Response, NextFunction } from "express";
import { createContact } from "../../useCases/createContact/createContact";
import { IContactsRepository, IContactsExternalService } from "../../useCases/ports";
import { ICreateContactRequestModel } from "../../useCases/createContact/createContact";
import { CreateContactPresenter } from "../presenters/CreateContactPresenter";
import { ViewModel } from "../../../shared/adapters/viewModel/ViewModel";
import { ContactsRepositoryFactory } from "../gateways/ContactsRepositoryFactory";
import { ContactsExternalServicesFactory } from "../services/ContactsExternalServices";

export const controller = (
  contactsRepository: IContactsRepository,
  contactsExternalServices: IContactsExternalService
) => {
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
      await createContact(
        contactsRepository,
        contactsExternalServices,
        presenter
      )(requestModel);
    } catch (error) {
      next(error);
    }
  }
}

export const createContactController = controller(
    ContactsRepositoryFactory.getRepository(),
    ContactsExternalServicesFactory.getServices()
  );