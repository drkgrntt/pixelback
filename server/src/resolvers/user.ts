import {
  Ctx,
  Query,
  Mutation,
  Resolver,
  Arg,
  ObjectType,
  Field,
  FieldResolver,
  Root,
  UseMiddleware,
} from 'type-graphql'
import { ILike } from 'typeorm'
import bcrypt from 'bcrypt'
import { User } from '../entities/User'
import { Token } from '../entities/Token'
import { Genre } from '../entities/Genre'
import { Story } from '../entities/Story'
import { Rating } from '../entities/Rating'
import { Subscription } from '../entities/Subscription'
import { FavoriteStory } from '../entities/FavoriteStory'
import { FavoriteGenre } from '../entities/FavoriteGenre'
import {
  Context,
  FeedbackType,
  PublishStatus,
  UserRole,
} from '../types'
import { isAuth } from '../middleware/isAuth'
import Mailer from '../utils/sendEmail'
import { Comment } from '../entities/Comment'

@ObjectType()
class UserResponse {
  @Field(() => User, { nullable: true })
  user: User

  @Field(() => Token, { nullable: true })
  token: Token
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { me }: Context): string {
    if (me?.id !== user.id) return ''
    return user.email
  }

  @FieldResolver(() => [Rating])
  async ratings(
    @Root() user: User,
    @Ctx() { ratingLoader, ratingIdsByUserLoader }: Context
  ): Promise<Rating[]> {
    const ratingIds = await ratingIdsByUserLoader.load(user.id)
    const ratings = (await ratingLoader.loadMany(
      ratingIds
    )) as Rating[]
    return ratings
  }

  @FieldResolver(() => [Story])
  async stories(
    @Ctx() { me, storyLoader, storyIdsByUserLoader }: Context,
    @Root() user: User
  ): Promise<Story[]> {
    const storyIds = await storyIdsByUserLoader.load(user.id)
    const stories = (await storyLoader.loadMany(storyIds)) as Story[]

    return stories
      .filter((story) => {
        return (
          story.status === PublishStatus.Published ||
          story.authorId === me?.id
        )
      })
      .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
  }

  @FieldResolver(() => [Story])
  async favoriteStories(
    @Root() user: User,
    @Ctx() { me, storyLoader, favoriteStoryIdsLoader }: Context
  ): Promise<Story[]> {
    const storyIds = await favoriteStoryIdsLoader.load(user.id)
    const stories = (await storyLoader.loadMany(storyIds)) as Story[]

    return stories
      .filter((story) => {
        return (
          story.status === PublishStatus.Published ||
          story.authorId === me?.id
        )
      })
      .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
  }

  @FieldResolver(() => [Genre])
  async favoriteGenres(
    @Root() user: User,
    @Ctx() { genreLoader, favoriteGenreIdsLoader }: Context
  ): Promise<Genre[]> {
    const genreIds = await favoriteGenreIdsLoader.load(user.id)
    const genres = (await genreLoader.loadMany(genreIds)) as Genre[]

    return genres
  }

  @FieldResolver(() => [Subscription])
  async subscriptions(@Root() user: User): Promise<Subscription[]> {
    return await Subscription.find({ subscriberId: user.id })
  }

  @FieldResolver(() => [Subscription])
  async subscribers(@Root() user: User): Promise<Subscription[]> {
    return await Subscription.find({ subscribedToId: user.id })
  }

  @FieldResolver(() => [Comment])
  async comments(@Root() user: User): Promise<Comment[]> {
    return await Comment.find({ authorId: user.id })
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { me }: Context): User {
    return me
  }

  @Query(() => User, { nullable: true })
  async user(@Arg('id') id: string): Promise<User | undefined> {
    const user = await User.findOne(id)
    return user
  }

  @Query(() => [User])
  async searchUsers(
    // @Arg('filters') filters: any,
    @Arg('search') search: string
  ): Promise<User[]> {
    const users = await User.find({
      where: [{ penName: ILike(`%${search}%`) }],
    })

    return users
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('password') password: string,
    @Arg('email') email: string
  ): Promise<UserResponse> {
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('Invalid email or password')
    }

    const correctPassword = await bcrypt.compare(
      password,
      user.password
    )
    if (!correctPassword) {
      throw new Error('Invalid email or password')
    }

    const token = await Token.generate(user.id)

    return {
      user,
      token,
    }
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('password') password: string,
    @Arg('email') email: string
  ): Promise<UserResponse> {
    if (!User.verifyEmailSyntax(email)) {
      throw new Error('Invalid email')
    }

    if (!User.verifyPasswordSyntax(password)) {
      throw new Error(
        'Invalid password. Make sure it is at least 8 characters and includes at least 1 letter and 1 number.'
      )
    }

    // Create the user
    const passwordHash = await bcrypt.hash(password, 13)
    const user = await User.create({
      email: email,
      password: passwordHash,
      role: UserRole.User,
      penName: email.split('@')[0], // TODO: improve this
    }).save()

    // Generate a token
    const token = await Token.generate(user.id)

    return {
      user,
      token,
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async resetPassword(
    @Ctx() { me }: Context,
    @Arg('oldPassword') oldPassword: string,
    @Arg('newPassword') newPassword: string
  ): Promise<boolean> {
    const correctPassword = await bcrypt.compare(
      oldPassword,
      me.password
    )
    if (!correctPassword) {
      throw new Error('Invalid old password')
    }

    const passwordHash = await bcrypt.hash(newPassword, 13)
    me.password = passwordHash
    await me.save()

    return true
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string
  ): Promise<boolean> {
    const user = await User.findOne({ email })
    if (!user) return true

    const token = await Token.generate(user.id, 1)
    const subject = 'Password Reset'
    const link = `${process.env.APP_BASE_URL}/profile?token=${token.value}`
    const template = 'passwordReset'
    const variables = {
      name: user.penName,
      link,
    }

    const mailer = new Mailer()
    const result = await mailer.sendEmail(
      user.email,
      subject,
      template,
      variables
    )

    return result
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async logout(@Ctx() { token }: Context): Promise<boolean> {
    const value = Token.unsign(token)
    const result = await Token.delete({ value })
    return !!result.affected
  }

  @Mutation(() => Token)
  @UseMiddleware(isAuth)
  async logoutEverywhere(@Ctx() { me }: Context): Promise<Token> {
    await Token.delete({ userId: me.id })
    const token = await Token.generate(me.id)
    return token
  }

  @Mutation(() => Token)
  @UseMiddleware(isAuth)
  async exchangeToken(@Ctx() { me, token }: Context): Promise<Token> {
    const value = Token.unsign(token)
    await Token.delete({ value })
    const newToken = await Token.generate(me.id)
    return newToken
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async deleteUserAndAllData(
    @Ctx() { me }: Context,
    @Arg('password') password: string
  ): Promise<string> {
    const correctPassword = await bcrypt.compare(
      password,
      me.password
    )
    if (!correctPassword) {
      throw new Error('Invalid email or password')
    }
    await me.remove()
    return me.id
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async addFavoriteStory(
    @Ctx() { me }: Context,
    @Arg('storyId') storyId: string
  ): Promise<User> {
    await FavoriteStory.create({
      userId: me.id,
      storyId: storyId,
    }).save()

    return me
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async removeFavoriteStory(
    @Ctx() { me }: Context,
    @Arg('storyId') storyId: string
  ): Promise<User> {
    await FavoriteStory.delete({
      userId: me.id,
      storyId: storyId,
    })

    return me
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async addFavoriteGenre(
    @Ctx() { me }: Context,
    @Arg('genreId') genreId: string
  ): Promise<User> {
    await FavoriteGenre.create({
      userId: me.id,
      genreId: genreId,
    }).save()

    return me
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async removeFavoriteGenre(
    @Ctx() { me }: Context,
    @Arg('genreId') genreId: string
  ): Promise<User> {
    await FavoriteGenre.delete({
      userId: me.id,
      genreId: genreId,
    })

    return me
  }

  @Mutation(() => Boolean)
  async giveFeedback(
    @Arg('type') type: FeedbackType,
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('summary') summary: string,
    @Arg('details') details: string
  ): Promise<boolean> {
    const mailer = new Mailer()
    const subject = `${FeedbackType[type]} feedback from ${firstName} ${lastName}`
    const variables = {
      type: FeedbackType[type],
      firstName,
      lastName,
      email,
      summary,
      details,
    }
    const result = await mailer.sendEmail(
      process.env.GMAIL,
      subject,
      'feedback',
      variables
    )

    return result
  }
}
