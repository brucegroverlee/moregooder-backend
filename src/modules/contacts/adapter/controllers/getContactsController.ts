import { Request, Response, NextFunction } from "express";
import { getContacts } from "../../useCases/getContacts/getContats";
import { IContactsRepository } from "../../useCases/ports";
import { IGetContactsRequestModel } from "../../useCases/getContacts/getContats";
import { parseQuery } from "../../../shared/helpers/parseQuery";
import { GetListPresenter } from "../../../shared/adapters/presenters/GetListPresenter";
import { ViewModel } from "../../../shared/adapters/viewModel/ViewModel";
import { ContactsRepositoryFactory } from "../gateways/ContactsRepositoryFactory";

export const controller = (peopleRepository: IContactsRepository) => {
  return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { query, pagination, timeRange } = parseQuery(request.query);
      const requestModel: IGetContactsRequestModel = {
        query,
        pagination,
        timeRange,
      };
      const viewModel = new ViewModel(response);
      const presenter = new GetListPresenter(viewModel);
      await getContacts(peopleRepository, presenter)(requestModel);
    } catch (error) {
      next(error);
    }
  }
}

export const getContactsController = controller(ContactsRepositoryFactory.getRepository());