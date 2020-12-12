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
  Int,
} from 'type-graphql'
import { getConnection, ILike, IsNull } from 'typeorm'
import fs from 'fs'
import path from 'path'
import { Story } from '../entities/Story'
import { User } from '../entities/User'
import { Comment } from '../entities/Comment'
import { Rating } from '../entities/Rating'
import { Context, PublishStatus, UserRole } from '../types'
import { isAuth } from '../middleware/isAuth'
import { Chapter } from '../entities/Chapter'
import { StoryGenre } from '../entities/StoryGenre'
import { Genre } from '../entities/Genre'
import { Read } from '../entities/Read'

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
  async ratings(
    @Root() story: Story,
    @Ctx() { ratingIdsByStoryLoader, ratingLoader }: Context
  ): Promise<Rating[]> {
    const ratingIds = await ratingIdsByStoryLoader.load({
      storyId: story.id,
      exclusive: true,
    })
    const ratings = (await ratingLoader.loadMany(
      ratingIds
    )) as Rating[]
    return ratings
  }

  @FieldResolver(() => Int)
  async rateStatus(
    @Root() story: Story,
    @Ctx() { me }: Context
  ): Promise<1 | 2 | 3 | 4 | 5 | undefined> {
    if (!me) return
    // Because of the specificity of this, I don't think
    // using a dataloader would lighten this load at all
    const rating = await Rating.findOne({
      where: {
        storyId: story.id,
        readerId: me.id,
        chapterId: IsNull(),
      },
    })
    return rating?.score
  }

  @FieldResolver(() => Float)
  async score(
    @Root() story: Story,
    @Ctx() { ratingIdsByStoryLoader, ratingLoader }: Context
  ): Promise<number> {
    const ratingIds = await ratingIdsByStoryLoader.load({
      storyId: story.id,
    })

    const allRatings = (await ratingLoader.loadMany(
      ratingIds
    )) as Rating[]

    if (!allRatings.length) return 0
    const total: number = allRatings.reduce(
      (score, rating) => score + rating.score,
      0
    )
    return total / allRatings.length
  }

  @FieldResolver(() => [Chapter])
  async chapters(
    @Ctx() { me, chapterIdsByStoryLoader, chapterLoader }: Context,
    @Root() story: Story
  ): Promise<Chapter[]> {
    if (
      story.authorId !== me?.id &&
      story.status !== PublishStatus.Published
    ) {
      return []
    }

    const chapterIds = await chapterIdsByStoryLoader.load(story.id)
    const chapters = (await chapterLoader.loadMany(
      chapterIds
    )) as Chapter[]

    return chapters
      .filter((chapter) => {
        return (
          chapter.authorId === me?.id ||
          chapter.status === PublishStatus.Published
        )
      })
      .sort((a, b) => a.number - b.number)
  }

  @FieldResolver(() => [Comment])
  async comments(
    @Root() story: Story,
    @Ctx() { me, commentIdsByStoryLoader, commentLoader }: Context
  ): Promise<Comment[]> {
    if (
      (!story.enableCommenting ||
        story.status !== PublishStatus.Published) &&
      story.authorId !== me?.id
    ) {
      return []
    }

    const commentIds = await commentIdsByStoryLoader.load(story.id)
    const comments = (await commentLoader.loadMany(
      commentIds
    )) as Comment[]
    return comments.sort((a, b) =>
      a.createdAt > b.createdAt ? 1 : -1
    )
  }

  @FieldResolver(() => [Genre])
  async genres(
    @Root() story: Story,
    @Ctx() { genreLoader, genreIdsByStoryLoader }: Context
  ): Promise<Genre[]> {
    const genreIds = await genreIdsByStoryLoader.load(story.id)
    const genres = (await genreLoader.loadMany(genreIds)) as Genre[]
    return genres
  }

  @FieldResolver(() => Int)
  async reads(@Root() story: Story): Promise<number> {
    return await Read.count({ where: { storyId: story.id } })
  }

  @Query(() => PaginatedResponse)
  async stories(
    @Arg('skip', { nullable: true }) skip: number = 0,
    @Arg('take', { nullable: true }) take: number = 30
  ): Promise<PaginatedResponse> {
    take = Math.min(30, take)

    const sql = fs
      .readFileSync(path.join('sql', 'stories.sql'))
      .toString()
    const foundStories = await getConnection().query(sql, [
      PublishStatus.Published,
      take + 1,
      skip,
    ])
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
  async story(
    @Ctx() { me, storyLoader }: Context,
    @Arg('id') id: string
  ): Promise<Story | undefined> {
    const story = await storyLoader.load(id)
    if (
      story.status !== PublishStatus.Published &&
      story.authorId !== me?.id
    ) {
      return
    }

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
    const story = await Story.create({
      title,
      body,
      summary,
      status,
      enableCommenting,
      authorId: me.id,
    }).save()

    if (me.role === UserRole.Reader) {
      me.role = UserRole.Writer
      await me.save()
    }

    return story
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

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async deleteStory(
    @Arg('id') id: string,
    @Ctx() { me }: Context
  ): Promise<string> {
    await Story.delete({ id, authorId: me.id })
    return id
  }

  @Mutation(() => Story)
  @UseMiddleware(isAuth)
  async addGenreToStory(
    @Arg('storyId') storyId: string,
    @Arg('genreId') genreId: string,
    @Ctx() { me }: Context
  ): Promise<Story> {
    const story = await Story.findOne({
      id: storyId,
      authorId: me.id,
    })

    if (!story) {
      throw new Error("This story doesn't exist")
    }

    await StoryGenre.create({
      storyId: storyId,
      genreId: genreId,
    }).save()

    return story
  }

  @Mutation(() => Story)
  @UseMiddleware(isAuth)
  async removeGenreFromStory(
    @Arg('storyId') storyId: string,
    @Arg('genreId') genreId: string,
    @Ctx() { me }: Context
  ): Promise<Story> {
    const story = await Story.findOne({
      id: storyId,
      authorId: me.id,
    })

    if (!story) {
      throw new Error("This story doesn't exist")
    }

    await StoryGenre.delete({
      storyId: storyId,
      genreId: genreId,
    })

    return story
  }
}
