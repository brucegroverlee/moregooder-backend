export interface IPagination {
  page: number;
  perPage: number;
  pages: number;
  total: number;
}

export function getPagination({ count, page, perPage, }: { count: number, page: number, perPage: number }): IPagination {
  const pages = Math.ceil(count / perPage);
  const total = count;
  return {
    page,
    perPage,
    pages,
    total,
  };
}