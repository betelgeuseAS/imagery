export interface IDoc {
  id: any
}

export interface IErrorResponse {
  code: number
  message: string
}

export interface IQueryFilter {
  sortBy: string
  projectBy: string
  limit: number
  page: number
  populate: string
}

export interface IQueryResult<T> {
  results: T[]
  page: number
  limit: number
  totalPages: number
  totalResults: number
}
