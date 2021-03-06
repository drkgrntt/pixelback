import { Request, Response } from 'express'
import { User } from './entities/User'
import { createSubscriptionIdsBySubscribedToLoader } from './dataloaders/createSubscriptionIdsBySubscribedToLoader'
import { createSubscriptionIdsBySubscriberLoader } from './dataloaders/createSubscriptionIdsBySubscriberLoader'
import { createCommentIdsByChapterLoader } from './dataloaders/createCommentIdsByChapterLoader'
import { createRatingIdsByChapterLoader } from './dataloaders/createRatingIdsByChapterLoader'
import { createChapterIdsByStoryLoader } from './dataloaders/createChapterIdsByStoryLoader'
import { createCommentIdsByStoryLoader } from './dataloaders/createCommentIdsByStoryLoader'
import { createRatingIdsByStoryLoader } from './dataloaders/createRatingIdsByStoryLoader'
import { createFavoriteStoryIdsLoader } from './dataloaders/createFavoriteStoryIdsLoader'
import { createCommentIdsByUserLoader } from './dataloaders/createCommentIdsByUserLoader'
import { createFavoriteGenreIdsLoader } from './dataloaders/createFavoriteGenreIdsLoader'
import { createRatingIdsByUserLoader } from './dataloaders/createRatingIdsByUserLoader'
import { createGenreIdsByStoryLoader } from './dataloaders/createGenreIdsByStoryLoader'
import { createStoryIdsByUserLoader } from './dataloaders/createStoryIdsByUserLoader'
import { createSubscriptionLoader } from './dataloaders/createSubscriptionLoader'
import { createChapterLoader } from './dataloaders/createChapterLoader'
import { createCommentLoader } from './dataloaders/createCommentLoader'
import { createProfileLoader } from './dataloaders/createProfileLoader'
import { createRatingLoader } from './dataloaders/createRatingLoader'
import { createGenreLoader } from './dataloaders/createGenreLoader'
import { createStoryLoader } from './dataloaders/createStoryLoader'
import { createUserLoader } from './dataloaders/createUserLoader'
import { Field, Float, Int, ObjectType } from 'type-graphql'
import Stripe from 'stripe'

export interface Context {
  req: Request
  res: Response
  me: User
  token: string
  profileLoader: ReturnType<typeof createProfileLoader>
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
  subscriptionIdsBySubscriberLoader: ReturnType<
    typeof createSubscriptionIdsBySubscriberLoader
  >
  subscriptionIdsBySubscribedToLoader: ReturnType<
    typeof createSubscriptionIdsBySubscribedToLoader
  >
}

export enum FeedbackType {
  General,
  Bug,
  Feature,
}

export enum UserRole {
  None,
  Reader,
  Writer,
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

@ObjectType()
export class StripeSource {
  constructor(paymentMethod: Stripe.PaymentMethod) {
    this.id = paymentMethod.id
    this.brand = paymentMethod.card?.brand || 'unknown'
    this.last4 = paymentMethod.card?.last4 || 'unknown'
    this.expMonth = paymentMethod.card?.exp_month || 0
    this.expYear = paymentMethod.card?.exp_year || 0
    this.name = `${this.brand} ending in ${this.last4} (exp ${this.expMonth}/${this.expYear})`
  }

  @Field(() => String)
  id: string

  @Field(() => String)
  brand: string

  @Field(() => String)
  last4: string

  @Field(() => Int)
  expMonth: number

  @Field(() => Int)
  expYear: number

  @Field(() => String)
  name: string
}

@ObjectType()
export class StripeSubscription {
  constructor(subscription: Stripe.Subscription) {
    this.id = subscription.id
    this.createdAt = new Date(subscription.created * 1000)
    this.currentPeriodStart = new Date(
      subscription.current_period_start * 1000
    )
    this.currentPeriodEnd = new Date(
      subscription.current_period_end * 1000
    )
    this.price =
      (subscription.items.data[0].price.unit_amount as number) / 100
    this.interval =
      subscription.items.data[0].price.recurring?.interval ||
      'unknown'
  }

  @Field(() => String)
  id: string

  @Field(() => String)
  createdAt: Date

  @Field(() => String)
  currentPeriodStart: Date

  @Field(() => String)
  currentPeriodEnd: Date

  @Field(() => Float)
  price: number

  @Field(() => String)
  interval: string
}
