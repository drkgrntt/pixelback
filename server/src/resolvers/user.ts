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
import { Context, UserRole } from '../types'

@ObjectType()
class UserResponse {
  @Field(() => User, { nullable: true })
  user: User

  @Field(() => Token, { nullable: true })
  token: Token
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => [Rating])
  async ratings(@Root() user: User): Promise<Rating[]> {
    return await Rating.find({ readerId: user.id })
  }

  @FieldResolver(() => [Story])
  async stories(@Root() user: User): Promise<Story[]> {
    return await Story.find({ authorId: user.id })
  }

  @FieldResolver(() => [Story])
  async favoriteStories(@Root() user: User): Promise<Story[]> {
    const favoriteStories = await FavoriteStory.find({
      where: { userId: user.id },
      relations: ['story'],
    })
    return favoriteStories.map((favoriteStory) => favoriteStory.story)
  }

  @FieldResolver(() => [Genre])
  async favoriteGenres(@Root() user: User): Promise<Genre[]> {
    const favoriteGenres = await FavoriteGenre.find({
      where: { userId: user.id },
      relations: ['genre'],
    })
    return favoriteGenres.map(
      (favoriteGenre) => favoriteGenre.genre
    )
  }

  @FieldResolver(() => [Subscription])
  async subscriptions(@Root() user: User): Promise<Subscription[]> {
    return await Subscription.find({ subscriberId: user.id })
  }

  @FieldResolver(() => [Subscription])
  async subscribers(@Root() user: User): Promise<Subscription[]> {
    return await Subscription.find({ subscribedToId: user.id })
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { me }: Context): User {
    return me
  }

  @Query(() => [User])
  async searchUsers(
    // @Arg('filters') filters: any,
    @Arg('search') search: string
  ): Promise<User[]> {
    const users = await User.find({
      where: [{ displayName: ILike(`%${search}%`) }],
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
      displayName: email.split('@')[0], // TODO: improve this
    }).save()

    // Generate a token
    const token = await Token.generate(user.id)

    return {
      user,
      token,
    }
  }

  @Mutation(() => Boolean)
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
  async logout(@Ctx() { token }: Context): Promise<boolean> {
    const value = Token.unsign(token)
    const result = await Token.delete({ value })
    return !!result.affected
  }

  @Mutation(() => Token)
  async logoutEverywhere(@Ctx() { me }: Context): Promise<Token> {
    await Token.delete({ userId: me.id })
    const token = await Token.generate(me.id)
    return token
  }

  @Mutation(() => Token)
  async exchangeToken(@Ctx() { me, token }: Context): Promise<Token> {
    const value = Token.unsign(token)
    await Token.delete({ value })
    const newToken = await Token.generate(me.id)
    return newToken
  }

  @Mutation(() => String)
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
}
