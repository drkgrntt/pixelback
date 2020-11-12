import { User } from './entities/User'
import { createUserLoader } from './utils/createUserLoader'

export interface Context {
  me: User,
  token: string,
  userLoader: ReturnType<typeof createUserLoader>
}

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

