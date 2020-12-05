import { User } from './entities/User'
import { createRatingIdsByStoryLoader } from './utils/createRatingIdsByStoryLoader'
import { createChapterIdsByStoryLoader } from './utils/createChapterIdsByStoryLoader'
import { createCommentIdsByStoryLoader } from './utils/createCommentIdsByStoryLoader'
import { createSubscriptionLoader } from './utils/createSubscriptionLoader'
import { createChapterLoader } from './utils/createChapterLoader'
import { createCommentLoader } from './utils/createCommentLoader'
import { createRatingLoader } from './utils/createRatingLoader'
import { createStoryLoader } from './utils/createStoryLoader'
import { createUserLoader } from './utils/createUserLoader'

export interface Context {
  me: User
  token: string
  userLoader: ReturnType<typeof createUserLoader>
  storyLoader: ReturnType<typeof createStoryLoader>
  chapterIdsByStoryLoader: ReturnType<
    typeof createChapterIdsByStoryLoader
  >
  commentIdsByStoryLoader: ReturnType<
    typeof createCommentIdsByStoryLoader
  >
  chapterLoader: ReturnType<typeof createChapterLoader>
  commentLoader: ReturnType<typeof createCommentLoader>
  ratingIdsByStoryLoader: ReturnType<
    typeof createRatingIdsByStoryLoader
  >
  ratingLoader: ReturnType<typeof createRatingLoader>
  subscriptionLoader: ReturnType<typeof createSubscriptionLoader>
}

export enum FeedbackType {
  general,
  bug,
  feature,
}

export enum UserRole {
  None,
  User,
  Author,
  Admin,
}

export enum PublishStatus {
  None,
  Published,
  Draft,
}

export enum SubLevel {
  None,
  Free,
  Paid,
}

export type RatingScore = 1 | 2 | 3 | 4 | 5
