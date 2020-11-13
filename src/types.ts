import { User } from './entities/User'
import { createChapterLoader } from './utils/createChapterLoader'
import { createRatingLoader } from './utils/createRatingLoader'
import { createStoryLoader } from './utils/createStoryLoader'
import { createSubscriptionLoader } from './utils/createSubscriptionLoader'
import { createUserLoader } from './utils/createUserLoader'

export interface Context {
  me: User,
  token: string,
  userLoader: ReturnType<typeof createUserLoader>,
  storyLoader: ReturnType<typeof createStoryLoader>,
  chapterLoader: ReturnType<typeof createChapterLoader>,
  ratingLoader: ReturnType<typeof createRatingLoader>,
  subscriptionLoader: ReturnType<typeof createSubscriptionLoader>
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

