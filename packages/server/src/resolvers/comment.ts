import {
  Ctx,
  Resolver,
  FieldResolver,
  Root,
  UseMiddleware,
  Arg,
  Mutation,
} from 'type-graphql'
import { User } from '../entities/User'
import { Story } from '../entities/Story'
import { Chapter } from '../entities/Chapter'
import { Comment } from '../entities/Comment'
import { Context, UserRole } from '../types'
import { isAuth } from '../middleware/isAuth'

@Resolver(Comment)
export class CommentResolver {
  @FieldResolver(() => Story)
  async story(
    @Root() comment: Comment,
    @Ctx() { storyLoader }: Context
  ): Promise<Story | null> {
    if (!comment.storyId) return null
    return await storyLoader.load(comment.storyId)
  }

  @FieldResolver(() => Chapter)
  async chapter(
    @Root() comment: Comment,
    @Ctx() { chapterLoader }: Context
  ): Promise<Chapter | null> {
    if (!comment.chapterId) return null
    return await chapterLoader.load(comment.chapterId)
  }

  @FieldResolver(() => User)
  async author(
    @Root() comment: Comment,
    @Ctx() { userLoader }: Context
  ): Promise<User> {
    return await userLoader.load(comment.authorId)
  }

  @Mutation(() => Comment)
  @UseMiddleware(isAuth)
  async comment(
    @Arg('storyId', { nullable: true }) storyId: string,
    @Arg('chapterId', { nullable: true }) chapterId: string,
    @Arg('body') body: string,
    @Ctx() { me }: Context
  ): Promise<Comment> {
    if ((!storyId && !chapterId) || (storyId && chapterId)) {
      throw new Error('Comments must have a storyId or chapterId')
    }

    const comment = await Comment.create({
      body,
      storyId,
      chapterId,
      authorId: me.id,
    }).save()

    return comment
  }

  @Mutation(() => Comment)
  @UseMiddleware(isAuth)
  async editComment(
    @Arg('id') id: string,
    @Arg('body') body: string,
    @Ctx() { me }: Context
  ): Promise<Comment> {
    // Ensure editor is either the owner or an admin
    const query: any = { id }
    if (me.role !== UserRole.Admin) {
      query.authorId = me.id
    }
    const comment = await Comment.findOne(query)
    if (!comment) {
      throw new Error('No comment found')
    }

    comment.body = body
    await comment.save()

    return comment
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async deleteComment(
    @Arg('id') id: string,
    @Ctx() { me }: Context
  ): Promise<string> {
    // Ensure deleter is either the owner or an admin
    const query: any = { id }
    if (me.role !== UserRole.Admin) {
      query.authorId = me.id
    }
    const comment = await Comment.findOne(query)
    if (!comment) {
      throw new Error('No comment found')
    }

    await comment.remove()

    return id
  }
}
