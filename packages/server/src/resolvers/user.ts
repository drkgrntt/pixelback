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
import { ILike, LessThan, Like } from 'typeorm'
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
  StripeSource,
  StripeSubscription,
} from '../types'
import { isAuth } from '../middleware/isAuth'
import Mailer from '../utils/Mailer'
import Payments from '../utils/Payments'
import { Comment } from '../entities/Comment'
import { templates, __prod__ } from '../constants'

@ObjectType()
class UserResponse {
  @Field(() => User, { nullable: true })
  user: User

  @Field(() => Token, { nullable: true })
  token: Token
}

@Resolver(User)
export class UserResolver {
  payments = new Payments()
  mailer = new Mailer()

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
      ratingIds || []
    )) as Rating[]
    return ratings
  }

  @FieldResolver(() => [Story])
  async stories(
    @Ctx() { me, storyLoader, storyIdsByUserLoader }: Context,
    @Root() user: User
  ): Promise<Story[]> {
    const storyIds = await storyIdsByUserLoader.load(user.id)
    const stories = (await storyLoader.loadMany(
      storyIds || []
    )) as Story[]

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
    const stories = (await storyLoader.loadMany(
      storyIds || []
    )) as Story[]

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
    const genres = (await genreLoader.loadMany(
      genreIds || []
    )) as Genre[]

    return genres
  }

  @FieldResolver(() => [Subscription])
  async subscriptions(
    @Root() user: User,
    @Ctx()
    { subscriptionIdsBySubscriberLoader, subscriptionLoader }: Context
  ): Promise<Subscription[]> {
    const subscriptionIds = await subscriptionIdsBySubscriberLoader.load(
      user.id
    )
    const subscriptions = (await subscriptionLoader.loadMany(
      subscriptionIds || []
    )) as Subscription[]

    return subscriptions
  }

  @FieldResolver(() => [Subscription])
  async subscribers(
    @Root() user: User,
    @Ctx()
    {
      subscriptionIdsBySubscribedToLoader,
      subscriptionLoader,
    }: Context
  ): Promise<Subscription[]> {
    const subscriptionIds = await subscriptionIdsBySubscribedToLoader.load(
      user.id
    )
    const subscriptions = (await subscriptionLoader.loadMany(
      subscriptionIds || []
    )) as Subscription[]

    return subscriptions
  }

  @FieldResolver(() => [Comment])
  async comments(
    @Root() user: User,
    @Ctx() { commentIdsByUserLoader, commentLoader }: Context
  ): Promise<Comment[]> {
    const commentIds = await commentIdsByUserLoader.load(user.id)
    const comments = (await commentLoader.loadMany(
      commentIds || []
    )) as Comment[]
    return comments
  }

  @FieldResolver(() => [StripeSource])
  async paymentMethods(@Root() user: User): Promise<StripeSource[]> {
    if (!user.stripeCustomerId) return []

    const paymentMethods = await this.payments.getPaymentMethods(user)

    return paymentMethods
  }

  @FieldResolver(() => StripeSubscription, { nullable: true })
  async roleSubscription(
    @Root() user: User
  ): Promise<StripeSubscription | null> {
    if (!user.stripeCustomerId) return null

    const subscriptions = await this.payments.getSubscriptions(user)
    const subscription = this.payments.getAuthorshipSubscription(
      subscriptions
    )
    if (!subscription) return null

    return new StripeSubscription(subscription)
  }

  @FieldResolver(() => Boolean)
  async canAcceptPayments(@Root() user: User): Promise<boolean> {
    const payments = new Payments()
    const account = await payments.getAccount(user)
    return !!account?.payouts_enabled
  }

  @FieldResolver(() => String, { nullable: true })
  async stripeAccountError(
    @Root() user: User
  ): Promise<string | undefined> {
    const payments = new Payments()
    const account = await payments.getAccount(user)
    const errors = account?.requirements?.errors
    if (errors) {
      return errors[0]?.reason
    }
    return
  }

  @Query(() => String)
  ping(): 'pong' {
    return 'pong'
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { me }: Context): User {
    return me
  }

  @Query(() => User, { nullable: true })
  async user(
    @Arg('id') id: string,
    @Ctx() { userLoader }: Context
  ): Promise<User | undefined> {
    const user = await userLoader.load(id)
    return user
  }

  @Query(() => [User])
  async searchUsers(@Arg('search') search: string): Promise<User[]> {
    const users = await User.find({
      where: [{ penName: ILike(`%${search}%`) }],
    })

    return users
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('password') password: string,
    @Arg('email') email: string,
    @Ctx() { res }: Context
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
    res.cookie('token', token.value, {
      secure: __prod__,
      sameSite: __prod__ ? 'none' : 'lax',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    })

    return {
      user,
      token,
    }
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('password') password: string,
    @Arg('email') email: string,
    @Ctx() { res }: Context
  ): Promise<UserResponse> {
    if (!User.verifyEmailSyntax(email)) {
      throw new Error('Invalid email')
    }

    if (!User.verifyPasswordSyntax(password)) {
      throw new Error(
        'Invalid password. Make sure it is at least 8 characters and includes at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.'
      )
    }

    let penName = email.split('@')[0]
    const userWithPenName = await User.findOne({
      select: ['id'],
      where: {
        penName,
      },
    })

    // Ensure penName is unique
    if (userWithPenName) {
      const usersWithSimilarPenName = await User.find({
        select: ['penName'],
        where: {
          penName: Like(penName),
        },
      })

      let i = 1
      let newPenName = `${penName}${i}`
      while (
        usersWithSimilarPenName.some(
          (user) => user.penName === newPenName
        )
      ) {
        newPenName = `${penName}${i++}`
      }
      penName = newPenName
    }

    // Create the user
    const passwordHash = await bcrypt.hash(password, 13)

    let user
    try {
      user = await User.create({
        email: email,
        password: passwordHash,
        role: UserRole.Reader,
        penName: penName,
      }).save()
    } catch (err) {
      throw new Error('The email you have chosen is already in use.')
    }

    // Generate a token
    const token = await Token.generate(user.id)
    res.cookie('token', token.value, {
      sameSite: __prod__ ? 'none' : 'lax',
      secure: __prod__,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    })

    return {
      user,
      token,
    }
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async updatePenName(
    @Ctx() { me }: Context,
    @Arg('penName') penName: string
  ): Promise<User> {
    try {
      me.penName = penName
      await me.save()
      return me
    } catch (err) {
      throw new Error('This pen name is not available.')
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
    const template = templates.passwordReset
    const variables = {
      name: user.penName,
      link,
    }

    const result = await this.mailer.sendEmail(
      user.email,
      subject,
      template,
      variables
    )

    return result
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async logout(@Ctx() { token, res }: Context): Promise<boolean> {
    const value = Token.unsign(token)
    const result = await Token.delete({ value })
    res.cookie('token', 'a.b.c', {
      sameSite: __prod__ ? 'none' : 'lax',
      secure: __prod__,
      maxAge: 0,
      httpOnly: true,
    })
    return !!result.affected
  }

  @Mutation(() => Token)
  @UseMiddleware(isAuth)
  async logoutEverywhere(
    @Ctx() { me, res }: Context
  ): Promise<Token> {
    await Token.delete({ userId: me.id })
    const token = await Token.generate(me.id)
    res.cookie('token', token.value, {
      sameSite: __prod__ ? 'none' : 'lax',
      secure: __prod__,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    })
    return token
  }

  @Mutation(() => Token)
  // @UseMiddleware(isAuth)
  async exchangeToken(
    @Ctx() { token, res }: Context,
    @Arg('token', { nullable: true }) oldToken: string
  ): Promise<Token> {
    const value = Token.unsign(oldToken || token)
    const foundToken = await Token.findOne({ where: { value } })
    if (!foundToken) throw new Error('No token found')
    const newToken = await Token.generate(foundToken.userId)
    res.cookie('token', newToken.value, {
      sameSite: __prod__ ? 'none' : 'lax',
      secure: __prod__,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    })
    await Token.delete({ value })
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
    const subject = `${FeedbackType[type]} feedback from ${firstName} ${lastName}`
    const variables = {
      type: FeedbackType[type],
      firstName,
      lastName,
      email,
      summary,
      details,
    }
    const result = await this.mailer.sendEmail(
      process.env.GMAIL,
      subject,
      templates.feedback,
      variables
    )

    return result
  }

  @Mutation(() => Boolean)
  async clearTokens() {
    const expiredTokens = await Token.delete({
      expiry: LessThan(new Date()),
    })
    return !!expiredTokens.affected
  }
}
