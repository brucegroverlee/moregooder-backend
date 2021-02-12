import { IGetListResponseModel  } from "../../useCases/ports";
import { getPagination, IPagination } from "../../helpers/getPagination";
import { ViewModel } from "../viewModel/ViewModel";

export class GetListPresenter implements IGetListResponseModel {
  constructor(private viewModel: ViewModel) {}

  resolve({rows, count, page, perPage, }: { rows: any[]; count: number; page: number; perPage: number; }): void {
    const pagination: IPagination = getPagination({count, page, perPage, });
    this.viewModel.resolveAccepted202({data: rows, pagination,});
  }
}