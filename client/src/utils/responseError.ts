import { AxiosResponse } from 'axios'

export default class ResponseError extends Error {
  constructor(
    message: string,
    public response: Response | AxiosResponse
  ) {
    super(message)
  }
}
