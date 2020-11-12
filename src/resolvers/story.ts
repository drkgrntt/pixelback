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
import { User } from '../entities/User'
import { Context, PublishStatus } from '../types'
import { isAuth } from '../middleware/isAuth'

@Resolver(Story)
export class StoryResolver {

  @FieldResolver(() => User)
  author(@Root() story: Story, @Ctx() { userLoader }: Context) {
    return userLoader.load(story.authorId)
  }

  @Query(() => [Story])
  async stories(): Promise<Story[]> {
    return await Story.find()
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
      authorId: me.id
    }).save()
  }
}
