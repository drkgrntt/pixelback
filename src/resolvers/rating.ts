import {
  Ctx,
  // Query,
  // Mutation,
  Resolver,
  // Arg,
  // ObjectType,
  // Field,
  FieldResolver,
  Root
} from 'type-graphql'
import { User } from '../entities/User'
import { Story } from '../entities/Story'
import { Chapter } from '../entities/Chapter'
import { Rating } from '../entities/Rating'
import { Context } from '../types'

@Resolver(Rating)
export class RatingResolver {

  @FieldResolver(() => Story)
  async story(@Root() rating: Rating, @Ctx() { storyLoader }: Context) {
    return storyLoader.load(rating.storyId)
  }

  @FieldResolver(() => Chapter)
  async chapter(@Root() rating: Rating, @Ctx() { chapterLoader }: Context) {
    if (!rating.chapterId) return null
    return chapterLoader.load(rating.chapterId)
  }

  @FieldResolver(() => User)
  async reader(@Root() rating: Rating, @Ctx() { userLoader }: Context) {
    return await userLoader.load(rating.readerId)
  }
}
