import {
  Ctx,
  Resolver,
  FieldResolver,
  Root,
  UseMiddleware,
  Arg,
  Mutation,
  Int
} from 'type-graphql'
import { User } from '../entities/User'
import { Story } from '../entities/Story'
import { Chapter } from '../entities/Chapter'
import { Rating } from '../entities/Rating'
import { Context, RatingScore } from '../types'
import { isAuth } from '../middleware/isAuth'

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

  @Mutation(() => Rating)
  @UseMiddleware(isAuth)
  async rateStory(
    @Arg("id") id: string,
    @Arg("score", () => Int) score: RatingScore,
    @Ctx() { me }: Context
  ): Promise<Rating> {

    let rating = await Rating.findOne({
      readerId: me.id,
      storyId: id
    })

    if (!rating) {
      rating = Rating.create({
        readerId: me.id,
        reader: me,
        storyId: id,
        story: await Story.findOne(id)
      })
    }

    if (rating.score !== score) {
      rating.score = score
      await rating.save()
    }

    return rating
  }
}
