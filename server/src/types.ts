import { User } from './entities/User'
import { createCommentIdsByChapterLoader } from './utils/createCommentIdsByChapterLoader'
import { createRatingIdsByChapterLoader } from './utils/createRatingIdsByChapterLoader'
import { createChapterIdsByStoryLoader } from './utils/createChapterIdsByStoryLoader'
import { createCommentIdsByStoryLoader } from './utils/createCommentIdsByStoryLoader'
import { createRatingIdsByStoryLoader } from './utils/createRatingIdsByStoryLoader'
import { createFavoriteStoryIdsLoader } from './utils/createFavoriteStoryIdsLoader'
import { createFavoriteGenreIdsLoader } from './utils/createFavoriteGenreIdsLoader'
import { createRatingIdsByUserLoader } from './utils/createRatingIdsByUserLoader'
import { createGenreIdsByStoryLoader } from './utils/createGenreIdsByStoryLoader'
import { createStoryIdsByUserLoader } from './utils/createStoryIdsByUserLoader'
import { createSubscriptionLoader } from './utils/createSubscriptionLoader'
import { createChapterLoader } from './utils/createChapterLoader'
import { createCommentLoader } from './utils/createCommentLoader'
import { createRatingLoader } from './utils/createRatingLoader'
import { createGenreLoader } from './utils/createGenreLoader'
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
