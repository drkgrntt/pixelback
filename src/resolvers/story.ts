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

  @Query(() => Story, { nullable: true })
  async story(
    @Arg("id") id: string
  ): Promise<Story | undefined> {
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
      authorId: me.id
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

    const result = await Story.update({
      id, authorId: me.id
    }, {
      title, body, status, enableCommenting, summary
    }, {
      reload: true
    })

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
    @Arg("id") id: string,
    @Ctx() { me }: Context
  ): Promise<Boolean> {

    const result = await Story.delete({ id, authorId: me.id })

    return !!result.affected
  }
}
