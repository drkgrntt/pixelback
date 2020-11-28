import {
  Ctx,
  Resolver,
  FieldResolver,
  Root,
  Arg,
  Mutation,
} from 'type-graphql'
import { User } from '../entities/User'
import { Story } from '../entities/Story'
import { Chapter } from '../entities/Chapter'
import { Read } from '../entities/Read'
import { Context } from '../types'

@Resolver(Read)
export class ReadResolver {
  @FieldResolver(() => Story)
  async story(
    @Root() read: Read,
    @Ctx() { storyLoader }: Context
  ): Promise<Story> {
    return await storyLoader.load(read.storyId)
  }

  @FieldResolver(() => Chapter)
  async chapter(
    @Root() read: Read,
    @Ctx() { chapterLoader }: Context
  ): Promise<Chapter | null> {
    if (!read.chapterId) return null
    return await chapterLoader.load(read.chapterId)
  }

  @FieldResolver(() => User)
  async reader(
    @Root() read: Read,
    @Ctx() { userLoader }: Context
  ): Promise<User | null> {
    if (!read.readerId) return null
    return await userLoader.load(read.readerId)
  }

  @Mutation(() => Read)
  async read(
    @Arg('storyId') storyId: string,
    @Arg('chapterId', { nullable: true }) chapterId: string,
    @Ctx() { me }: Context
  ): Promise<Read> {
    const read = await Read.create({
      readerId: me?.id,
      storyId,
      chapterId,
    }).save()

    return read
  }
}
