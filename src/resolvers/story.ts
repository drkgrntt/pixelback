import {
  Ctx,
  Mutation,
  Resolver,
  Arg,
  UseMiddleware,
  Query,
  FieldResolver,
  Root,
  Float,
} from 'type-graphql'
import { Story } from '../entities/Story'
import { User } from '../entities/User'
import { Rating } from '../entities/Rating'
import { Context, PublishStatus } from '../types'
import { isAuth } from '../middleware/isAuth'
import { Chapter } from '../entities/Chapter'

@Resolver(Story)
export class StoryResolver {
  @FieldResolver(() => User)
  async author(
    @Root() story: Story,
    @Ctx() { userLoader }: Context
  ): Promise<User> {
    return await userLoader.load(story.authorId)
  }

  @FieldResolver(() => [Rating])
  async ratings(@Root() story: Story): Promise<Rating[]> {
    return await Rating.find({ storyId: story.id })
  }

  @FieldResolver(() => Float)
  async score(@Root() story: Story): Promise<number> {
    const allRatings = await Rating.find({ storyId: story.id })
    const total: number = allRatings.reduce(
      (score, rating) => score + rating.score,
      0
    )
    return total / allRatings.length
  }

  @FieldResolver(() => [Chapter])
  async chapters(@Root() story: Story): Promise<Chapter[]> {
    return await Chapter.find({ storyId: story.id })
  }

  @Query(() => [Story])
  async stories(): Promise<Story[]> {
    return await Story.find()
  }

  @Query(() => Story, { nullable: true })
  async story(@Arg('id') id: string): Promise<Story | undefined> {
    const story = Story.findOne(id)
    return story
  }

  @Mutation(() => Story)
  @UseMiddleware(isAuth)
  async createStory(
    @Arg('title') title: string,
    @Arg('body') body: string,
    @Arg('status') status: PublishStatus,
    @Arg('enableCommenting') enableCommenting: boolean,
    @Arg('summary') summary: string,
    @Ctx() { me }: Context
  ): Promise<Story> {
    return await Story.create({
      title,
      body,
      summary,
      status,
      enableCommenting,
      authorId: me.id,
    }).save()
  }

  @Mutation(() => Story)
  @UseMiddleware(isAuth)
  async updateStory(
    @Arg('id') id: string,
    @Arg('title') title: string,
    @Arg('body') body: string,
    @Arg('status') status: PublishStatus,
    @Arg('enableCommenting') enableCommenting: boolean,
    @Arg('summary') summary: string,
    @Ctx() { me }: Context
  ): Promise<Story> {
    const result = await Story.update(
      {
        id,
        authorId: me.id,
      },
      {
        title,
        body,
        status,
        enableCommenting,
        summary,
      }
    )

    if (!result.affected) {
      throw new Error('Something went wrong')
    }

    const story = await Story.findOne({ id, authorId: me.id })
    if (!story) {
      throw new Error('Something went wrong')
    }

    return story
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteStory(
    @Arg('id') id: string,
    @Ctx() { me }: Context
  ): Promise<Boolean> {
    const result = await Story.delete({ id, authorId: me.id })

    return !!result.affected
  }
}
