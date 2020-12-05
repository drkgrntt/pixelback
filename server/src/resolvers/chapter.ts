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
import { IsNull } from 'typeorm'
import { Story } from '../entities/Story'
import { Comment } from '../entities/Comment'
import { Chapter } from '../entities/Chapter'
import { Rating } from '../entities/Rating'
import { Read } from '../entities/Read'
import { Context, PublishStatus } from '../types'
import { isAuth } from '../middleware/isAuth'
import { User } from '../entities/User'

@Resolver(Chapter)
export class ChapterResolver {
  @FieldResolver(() => User)
  async author(
    @Root() chapter: Chapter,
    @Ctx() { userLoader }: Context
  ): Promise<User> {
    return await userLoader.load(chapter.authorId)
  }

  @FieldResolver(() => Story)
  async story(
    @Root() chapter: Chapter,
    @Ctx() { storyLoader }: Context
  ): Promise<Story> {
    return await storyLoader.load(chapter.storyId)
  }

  @FieldResolver(() => [Rating])
  async ratings(
    @Root() chapter: Chapter,
    @Ctx() { ratingLoader, ratingIdsByChapterLoader }: Context
  ): Promise<Rating[]> {
    const ratingIds = await ratingIdsByChapterLoader.load(chapter.id)
    const ratings = (await ratingLoader.loadMany(
      ratingIds
    )) as Rating[]
    return ratings
  }

  @FieldResolver(() => Int)
  async rateStatus(
    @Root() chapter: Chapter,
    @Ctx() { me }: Context
  ): Promise<1 | 2 | 3 | 4 | 5 | undefined> {
    if (!me) return
    // Because of the specificity of this, I don't think
    // using a dataloader would lighten this load at all
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
  async comments(
    @Root() chapter: Chapter,
    @Ctx() { me, commentLoader, commentIdsByChapterLoader }: Context
  ): Promise<Comment[]> {
    if (
      (!chapter.enableCommenting ||
        chapter.status !== PublishStatus.Published) &&
      chapter.authorId !== me?.id
    ) {
      return []
    }

    const commentIds = await commentIdsByChapterLoader.load(
      chapter.id
    )
    const comments = (await commentLoader.loadMany(
      commentIds
    )) as Comment[]
    return comments.sort((a, b) =>
      a.createdAt > b.createdAt ? 1 : -1
    )
  }

  @FieldResolver(() => Float)
  async score(
    @Root() chapter: Chapter,
    @Ctx() { ratingLoader, ratingIdsByChapterLoader }: Context
  ): Promise<number> {
    const ratingIds = await ratingIdsByChapterLoader.load(chapter.id)

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

  @FieldResolver(() => Chapter)
  async previous(
    @Ctx() { me }: Context,
    @Root() chapter: Chapter
  ): Promise<Chapter | undefined> {
    // Not sure how I could do this with dataloaders
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
    // Not sure how I could do this with dataloaders
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
    @Ctx() { me, chapterIdsByStoryLoader, chapterLoader }: Context
  ): Promise<Chapter[]> {
    const chapterIds = await chapterIdsByStoryLoader.load(storyId)
    const chapters = (await chapterLoader.loadMany(
      chapterIds
    )) as Chapter[]

    return chapters
      .filter((chapter) => {
        return (
          chapter.status === PublishStatus.Published ||
          chapter.authorId === me?.id
        )
      })
      .sort((a, b) => a.number - b.number)
  }

  @Query(() => Chapter, { nullable: true })
  async chapter(
    @Ctx() { me, chapterLoader }: Context,
    @Arg('id') id: string
  ): Promise<Chapter | undefined> {
    const chapter = await chapterLoader.load(id)
    if (
      chapter?.status !== PublishStatus.Published ||
      chapter.authorId !== me?.id
    ) {
      return
    }
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
