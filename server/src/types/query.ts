import { IUser } from './models'

export interface IUserInfoRequest extends Express.Request {
  user: IUser
}
