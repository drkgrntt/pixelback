import {
  Ctx,
  Resolver,
  FieldResolver,
  Root,
  UseMiddleware,
  Arg,
  Mutation,
  Int,
} from 'type-graphql'
import { IsNull } from 'typeorm'
import { User } from '../entities/User'
import { Story } from '../entities/Story'
import { Chapter } from '../entities/Chapter'
import { Rating } from '../entities/Rating'
import { Context, RatingScore } from '../types'
import { isAuth } from '../middleware/isAuth'

@Resolver(Rating)
export class RatingResolver {
  @FieldResolver(() => Story)
  async story(
    @Root() rating: Rating,
    @Ctx() { storyLoader }: Context
  ): Promise<Story> {
    return await storyLoader.load(rating.storyId)
  }

  @FieldResolver(() => Chapter)
  async chapter(
    @Root() rating: Rating,
    @Ctx() { chapterLoader }: Context
  ): Promise<Chapter | null> {
    if (!rating.chapterId) return null
    return await chapterLoader.load(rating.chapterId)
  }

  @FieldResolver(() => User)
  async reader(
    @Root() rating: Rating,
    @Ctx() { userLoader }: Context
  ): Promise<User> {
    return await userLoader.load(rating.readerId)
  }

  @Mutation(() => Rating)
  @UseMiddleware(isAuth)
  async rate(
    @Arg('storyId') storyId: string,
    @Arg('chapterId', { nullable: true }) chapterId: string,
    @Arg('score', () => Int) score: RatingScore,
    @Ctx() { me }: Context
  ): Promise<Rating> {
    const query: any = { readerId: me.id, storyId, chapterId }
    if (!chapterId) query.chapterId = IsNull()
    let rating = await Rating.findOne(query)

    if (!rating) {
      rating = Rating.create({
        readerId: me.id,
        reader: me,
        storyId,
        chapterId,
      })
    }

    if (rating.score !== score) {
      rating.score = score
      await rating.save()
    }

    return rating
  }
}
