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
  Int,
} from 'type-graphql'
import { Story } from '../entities/Story'
import { Comment } from '../entities/Comment'
import { Chapter } from '../entities/Chapter'
import { Rating } from '../entities/Rating'
import { Read } from '../entities/Read'
import { Context, PublishStatus } from '../types'
import { isAuth } from '../middleware/isAuth'
import { IsNull } from 'typeorm'

@Resolver(Chapter)
export class ChapterResolver {
  @FieldResolver(() => Story)
  async story(
    @Root() chapter: Chapter,
    @Ctx() { storyLoader }: Context
  ): Promise<Story> {
    return await storyLoader.load(chapter.storyId)
  }

  @FieldResolver(() => [Rating])
  async ratings(@Root() chapter: Chapter): Promise<Rating[]> {
    return await Rating.find({ chapterId: chapter.id })
  }

  @FieldResolver(() => Int)
  async rateStatus(
    @Root() chapter: Chapter,
    @Ctx() { me }: Context
  ): Promise<1 | 2 | 3 | 4 | 5 | undefined> {
    if (!me) return
    const rating = await Rating.findOne({
      where: {
        storyId: chapter.storyId,
        readerId: me.id,
        chapterId: chapter.id,
      },
    })
    return rating?.score
  }

  @FieldResolver(() => [Comment])
  async comments(@Root() chapter: Chapter): Promise<Comment[]> {
    return await Comment.find({ chapterId: chapter.id })
  }

  @FieldResolver(() => Float)
  async score(@Root() chapter: Chapter): Promise<number> {
    const allRatings = await Rating.find({ chapterId: chapter.id })
    if (!allRatings.length) return 0
    const total: number = allRatings.reduce(
      (score, rating) => score + rating.score,
      0
    )
    return total / allRatings.length
  }

  @FieldResolver(() => Chapter)
  async previous(
    @Ctx() { me }: Context,
    @Root() chapter: Chapter
  ): Promise<Chapter | undefined> {
    const query = {
      where: [
        {
          storyId: chapter.storyId,
          number: chapter.number - 1,
          status: PublishStatus.Published,
        },
        {
          storyId: chapter.storyId,
          number: chapter.number - 1,
          authorId: me?.id || IsNull(),
        },
      ],
    }
    const previousChapter = await Chapter.findOne(query)
    return previousChapter
  }

  @FieldResolver(() => Chapter)
  async next(
    @Ctx() { me }: Context,
    @Root() chapter: Chapter
  ): Promise<Chapter | undefined> {
    const query = {
      where: [
        {
          storyId: chapter.storyId,
          number: chapter.number + 1,
          status: PublishStatus.Published,
        },
        {
          storyId: chapter.storyId,
          number: chapter.number + 1,
          authorId: me?.id || IsNull(),
        },
      ],
    }
    const nextChapter = await Chapter.findOne(query)
    return nextChapter
  }

  @FieldResolver(() => Int)
  async reads(@Root() chapter: Chapter): Promise<number> {
    return await Read.count({ where: { chapterId: chapter.id } })
  }

  @Query(() => [Chapter])
  async chapters(
    @Arg('storyId') storyId: string,
    @Ctx() { me }: Context
  ): Promise<Chapter[]> {
    const query = {
      where: [
        {
          storyId,
          status: PublishStatus.Published,
        },
        {
          storyId,
          authorId: me?.id || IsNull(),
        },
      ],
    }
    return await Chapter.find(query)
  }

  @Query(() => Chapter, { nullable: true })
  async chapter(
    @Ctx() { me }: Context,
    @Arg('id') id: string
  ): Promise<Chapter | undefined> {
    const query = {
      where: [
        {
          id,
          status: PublishStatus.Published,
        },
        {
          id,
          authorId: me?.id || IsNull(),
        },
      ],
    }
    const chapter = Chapter.findOne(query)
    return chapter
  }

  @Mutation(() => Chapter)
  @UseMiddleware(isAuth)
  async createChapter(
    @Arg('storyId') storyId: string,
    @Arg('number') number: number,
    @Arg('title') title: string,
    @Arg('body') body: string,
    @Arg('status') status: PublishStatus,
    @Arg('enableCommenting') enableCommenting: boolean,
    @Arg('summary') summary: string,
    @Ctx() { me }: Context
  ): Promise<Chapter> {
    // Make sure the user is the author of the story
    const story = await Story.findOne({
      id: storyId,
      authorId: me.id,
    })

    if (!story) {
      throw new Error('You do not own this story.')
    }

    return await Chapter.create({
      storyId,
      number,
      title,
      body,
      summary,
      status,
      enableCommenting,
    }).save()
  }

  @Mutation(() => Chapter)
  @UseMiddleware(isAuth)
  async updateChapter(
    @Arg('id') id: string,
    @Arg('number') number: number,
    @Arg('title') title: string,
    @Arg('body') body: string,
    @Arg('status') status: PublishStatus,
    @Arg('enableCommenting') enableCommenting: boolean,
    @Arg('summary') summary: string,
    @Ctx() { me }: Context
  ): Promise<Chapter> {
    // Make sure the user is the author of the story
    let chapter = await Chapter.findOne(
      { id },
      { relations: ['story'] }
    )
    if (!chapter) {
      throw new Error('This chapter does not exist.')
    }

    if (chapter.story.authorId !== me.id) {
      throw new Error('You do not own this.')
    }

    chapter.number = number
    chapter.title = title
    chapter.body = body
    chapter.summary = summary
    chapter.status = status
    chapter.enableCommenting = enableCommenting

    chapter = await chapter.save()

    return chapter
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async deleteChapter(
    @Arg('id') id: string,
    @Ctx() { me }: Context
  ): Promise<string> {
    // Make sure the user is the author of the story
    let chapter = await Chapter.findOne(
      { id },
      { relations: ['story'] }
    )
    if (!chapter) {
      return id
    }

    if (chapter.story.authorId !== me.id) {
      throw new Error('You do not own this.')
    }

    await chapter.remove()

    return id
  }
}
