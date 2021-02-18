import { IGetListResponseModel } from "../../../shared/useCases/ports";
import { IContactsRepository } from "../ports";

export interface IGetContactsRequestModel {
  query: {
    name?: string;
    email?: string;
  };
  pagination: {
    page: number;
    perPage: number;
  };
  timeRange?: {
    since: string;
    until: string;
  };
}

export function getContacts(
  contactsRepository: IContactsRepository,
  presenter: IGetListResponseModel
) {
  return async (request: IGetContactsRequestModel): Promise<void> => {
    try {
      const { count, rows, } = await contactsRepository
      .findAndCountAll(
      request.query,
      {
        pagination: request.pagination,
        timeRange: request.timeRange,
      });
      presenter.resolve({rows, count, ...request.pagination});
      return;
    } catch (error) {
      throw error;
    }
  };
}
