import { User } from './entities/User'
import { createCommentIdsByChapterLoader } from './dataloaders/createCommentIdsByChapterLoader'
import { createRatingIdsByChapterLoader } from './dataloaders/createRatingIdsByChapterLoader'
import { createChapterIdsByStoryLoader } from './dataloaders/createChapterIdsByStoryLoader'
import { createCommentIdsByStoryLoader } from './dataloaders/createCommentIdsByStoryLoader'
import { createRatingIdsByStoryLoader } from './dataloaders/createRatingIdsByStoryLoader'
import { createFavoriteStoryIdsLoader } from './dataloaders/createFavoriteStoryIdsLoader'
import { createCommentIdsByUserLoader } from './dataloaders/createCommentIdsByUserLoader'
import { createFavoriteGenreIdsLoader } from './dataloaders/createFavoriteGenreIdsLoader'
import { createSubscriptionIdsLoader } from './dataloaders/createSubscriptionIdsLoader'
import { createRatingIdsByUserLoader } from './dataloaders/createRatingIdsByUserLoader'
import { createGenreIdsByStoryLoader } from './dataloaders/createGenreIdsByStoryLoader'
import { createStoryIdsByUserLoader } from './dataloaders/createStoryIdsByUserLoader'
import { createSubscriptionLoader } from './dataloaders/createSubscriptionLoader'
import { createChapterLoader } from './dataloaders/createChapterLoader'
import { createCommentLoader } from './dataloaders/createCommentLoader'
import { createRatingLoader } from './dataloaders/createRatingLoader'
import { createGenreLoader } from './dataloaders/createGenreLoader'
import { createStoryLoader } from './dataloaders/createStoryLoader'
import { createUserLoader } from './dataloaders/createUserLoader'

export interface Context {
  me: User
  token: string
  userLoader: ReturnType<typeof createUserLoader>
  storyLoader: ReturnType<typeof createStoryLoader>
  commentIdsByUserLoader: ReturnType<
    typeof createCommentIdsByUserLoader
  >
  chapterIdsByStoryLoader: ReturnType<
    typeof createChapterIdsByStoryLoader
  >
  commentIdsByStoryLoader: ReturnType<
    typeof createCommentIdsByStoryLoader
  >
  commentIdsByChapterLoader: ReturnType<
    typeof createCommentIdsByChapterLoader
  >
  genreIdsByStoryLoader: ReturnType<
    typeof createGenreIdsByStoryLoader
  >
  favoriteStoryIdsLoader: ReturnType<
    typeof createFavoriteStoryIdsLoader
  >
  favoriteGenreIdsLoader: ReturnType<
    typeof createFavoriteGenreIdsLoader
  >
  storyIdsByUserLoader: ReturnType<typeof createStoryIdsByUserLoader>
  genreLoader: ReturnType<typeof createGenreLoader>
  chapterLoader: ReturnType<typeof createChapterLoader>
  commentLoader: ReturnType<typeof createCommentLoader>
  ratingIdsByStoryLoader: ReturnType<
    typeof createRatingIdsByStoryLoader
  >
  ratingIdsByUserLoader: ReturnType<
    typeof createRatingIdsByUserLoader
  >
  ratingIdsByChapterLoader: ReturnType<
    typeof createRatingIdsByChapterLoader
  >
  ratingLoader: ReturnType<typeof createRatingLoader>
  subscriptionLoader: ReturnType<typeof createSubscriptionLoader>
  subscriptionIdsLoader: ReturnType<
    typeof createSubscriptionIdsLoader
  >
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
