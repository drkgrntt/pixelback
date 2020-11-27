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
import { View } from '../entities/View'
import { Context } from '../types'

@Resolver(View)
export class ViewResolver {
  @FieldResolver(() => Story)
  async story(
    @Root() view: View,
    @Ctx() { storyLoader }: Context
  ): Promise<Story> {
    return await storyLoader.load(view.storyId)
  }

  @FieldResolver(() => Chapter)
  async chapter(
    @Root() view: View,
    @Ctx() { chapterLoader }: Context
  ): Promise<Chapter | null> {
    if (!view.chapterId) return null
    return await chapterLoader.load(view.chapterId)
  }

  @FieldResolver(() => User)
  async viewer(
    @Root() view: View,
    @Ctx() { userLoader }: Context
  ): Promise<User | null> {
    if (!view.viewerId) return null
    return await userLoader.load(view.viewerId)
  }

  @Mutation(() => View)
  async view(
    @Arg('storyId') storyId: string,
    @Arg('chapterId', { nullable: true }) chapterId: string,
    @Ctx() { me }: Context
  ): Promise<View> {
    const view = await View.create({
      viewerId: me?.id,
      storyId,
      chapterId,
    }).save()

    return view
  }
}
