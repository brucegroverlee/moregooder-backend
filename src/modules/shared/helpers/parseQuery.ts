interface IRequestQuery {
  query: any;
  pagination: {
    page: number;
    perPage: number;
  };
  timeRange?: {
    since: string;
    until: string;
  };
}

export function parseQuery(requestQuery: any): IRequestQuery {
  const page = requestQuery.page as unknown as number;
  const perPage = requestQuery.perPage as unknown as number;
  const since = requestQuery.since as unknown as string;
  const until = requestQuery.until as unknown as string;
  delete requestQuery.page;
  delete requestQuery.perPage;
  delete requestQuery.since;
  delete requestQuery.until;
  const result: IRequestQuery = {
    query: requestQuery,
    pagination: {
      page,
      perPage,
    },
  };
  if (since && until) {
    // tslint:disable-next-line:no-string-literal
    result["timeRange"] = {
      since,
      until,
    };
  }
  return result;
}