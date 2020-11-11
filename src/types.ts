import { User } from './entities/User'

export enum UserRole {
  None,
  User,
  Author,
  Admin
}

export interface Context {
  me: User,
  token: string
}
