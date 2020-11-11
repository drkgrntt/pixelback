import {
  Ctx,
  Query,
  Mutation,
  Resolver,
  Arg,
  ObjectType,
  Field
} from 'type-graphql'
import bcrypt from 'bcrypt'
import { User } from '../entities/User'
import { Token } from '../entities/Token'
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

  @Query(() => User, { nullable: true })
  me(@Ctx() { me }: Context) {
    return me;
  }

  verifyEmailSyntax(email: string): boolean {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(String(email).toLowerCase())
  }

  verifyPasswordSyntax(password: string): boolean {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return regex.test(String(password))
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("password") password: string,
    @Arg("email") email: string
  ): Promise<UserResponse> {

    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('Invalid email or password')
    }

    const correctPassword = await bcrypt.compare(password, user.password)
    if (!correctPassword) {
      throw new Error('Invalid email or password')
    }

    const token = await Token.generate(user.id)

    return {
      user,
      token
    }
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("password") password: string,
    @Arg("email") email: string
  ): Promise<UserResponse> {

    if (!this.verifyEmailSyntax(email)) {
      throw new Error('Invalid email')
    }

    if (!this.verifyPasswordSyntax(password)) {
      throw new Error('Invalid password. Make sure it is at least 8 characters and includes at least 1 letter and 1 number.')
    }

    // Create the user
    const passwordHash = await bcrypt.hash(password, 13)
    const user = await User.create({
      email: email,
      password: passwordHash,
      role: UserRole.User,
      displayName: email.split('@')[0] // TODO: improve this
    }).save()

    // Generate a token
    const token = await Token.generate(user.id)

    return {
      user,
      token
    }
  }

  @Mutation(() => Boolean)
  async logout(
    @Ctx() { token }: Context
  ) {
    const value = Token.unsign(token)
    const result = await Token.delete({ value })
    return !!result.affected
  }
}
