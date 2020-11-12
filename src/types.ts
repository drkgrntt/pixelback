import { User } from './entities/User'

export enum UserRole {
  None,
  User,
  Author,
  Admin
}

export enum PublishStatus {
  None,
  Published,
  Draft
}

export enum SubLevel {
  None,
  Free,
  Paid
}

export type RatingScore = 1 | 2 | 3 | 4 | 5

export interface Context {
  me: User,
  token: string
}
