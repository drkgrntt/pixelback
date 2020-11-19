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
  ObjectType,
  Field,
} from 'type-graphql'
import { ILike } from 'typeorm'
import { Story } from '../entities/Story'
import { User } from '../entities/User'
import { Comment } from '../entities/Comment'
import { Rating } from '../entities/Rating'
import { Context, PublishStatus } from '../types'
import { isAuth } from '../middleware/isAuth'
import { Chapter } from '../entities/Chapter'
import { StoryGenre } from '../entities/StoryGenre'

@ObjectType()
class PageData {
  @Field()
  hasMore: boolean

  @Field({ nullable: true })
  skip?: number
}

@ObjectType()
class PaginatedResponse {
  @Field()
  pageData: PageData

  @Field(() => [Story])
  stories: Story[]
}

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
    if (!allRatings.length) return 0
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

  @FieldResolver(() => [Comment])
  async comments(@Root() story: Story): Promise<Comment[]> {
    return await Comment.find({ storyId: story.id })
  }

  @FieldResolver(() => [String])
  async genres(@Root() story: Story): Promise<string[]> {
    const storyGenres = await StoryGenre.find({
      where: { storyId: story.id },
      relations: ['genre']
    })
    return storyGenres.map(storyGenre => storyGenre.genre.name)
  }

  @Query(() => PaginatedResponse)
  async stories(
    @Arg('skip', { nullable: true }) skip: number = 0,
    @Arg('take', { nullable: true }) take: number = 10
  ): Promise<PaginatedResponse> {
    take = Math.min(50, take)

    const query = {
      where: {
        status: PublishStatus.Published,
      },
      take: take + 1,
      skip: skip,
      order: {
        createdAt: 'DESC' as const,
      },
    }
    const foundStories = await Story.find(query)
    const stories = foundStories.slice(0, take)

    const hasMore = foundStories.length > take

    return {
      pageData: {
        hasMore,
        skip: hasMore ? take + skip : undefined,
      },
      stories,
    }
  }

  @Query(() => Story, { nullable: true })
  async story(@Arg('id') id: string): Promise<Story | undefined> {
    const story = Story.findOne(id)
    return story
  }

  @Query(() => PaginatedResponse)
  async searchStories(
    @Arg('skip', { nullable: true }) skip: number = 0,
    @Arg('take', { nullable: true }) take: number = 10,
    // @Arg('filters') filters: any,
    @Arg('search') search: string
  ): Promise<PaginatedResponse> {
    take = Math.min(50, take)

    const query = {
      where: {
        status: PublishStatus.Published,
        title: ILike(`%${search}%`),
      },
      take: take + 1,
      skip: skip,
      order: {
        createdAt: 'DESC' as const,
      },
    }

    const foundStories = await Story.find(query)
    const stories = foundStories.slice(0, take)

    const hasMore = foundStories.length > take

    return {
      pageData: {
        hasMore,
        skip: hasMore ? take + skip : undefined,
      },
      stories,
    }
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
    let story = await Story.findOne({ id, authorId: me.id })
    if (!story) {
      throw new Error("This story doesn't exist")
    }

    story.title = title
    story.body = body
    story.status = status
    story.enableCommenting = enableCommenting
    story.summary = summary

    story = await story.save()

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
