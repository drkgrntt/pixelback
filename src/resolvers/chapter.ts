import {
  Ctx,
  Mutation,
  Resolver,
  Arg,
  UseMiddleware,
  Query,
  FieldResolver,
  Root,
} from 'type-graphql'
import { Story } from '../entities/Story'
import { Chapter } from '../entities/Chapter'
import { Rating } from '../entities/Rating'
import { Context, PublishStatus } from '../types'
import { isAuth } from '../middleware/isAuth'

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

  @Query(() => [Chapter])
  async chapters(
    @Arg('storyId') storyId: string
  ): Promise<Chapter[]> {
    return await Chapter.find({ storyId })
  }

  @Query(() => Chapter, { nullable: true })
  async chapter(@Arg('id') id: string): Promise<Chapter | undefined> {
    const chapter = Chapter.findOne(id)
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
    let chapter = await Chapter.findOne({ id }, { relations: ['story'] })
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

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteChapter(
    @Arg('id') id: string,
    @Ctx() { me }: Context
  ): Promise<Boolean> {

    // Make sure the user is the author of the story
    let chapter = await Chapter.findOne({ id }, { relations: ['story'] })
    if (!chapter) {
      return false
    }

    if (chapter.story.authorId !== me.id) {
      throw new Error('You do not own this.')
    }

    await chapter.remove()

    return true
  }
}