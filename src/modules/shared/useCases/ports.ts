export interface IGetListResponseModel {
  resolve(values: {
    rows: any[];
    count: number;
    page: number;
    perPage: number;
  }): void;
}