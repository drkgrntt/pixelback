import {
  Ctx,
  Query,
  Mutation,
  Resolver,
  Arg
} from 'type-graphql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../entities/User'
import { Context, UserRole } from '../types'

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

  @Mutation(() => String)
  async register(
    @Arg("password") password: string,
    @Arg("email") email: string
  ): Promise<string> {

    if (!this.verifyEmailSyntax(email)) {
      throw new Error('Invalid email')
    }

    if (!this.verifyPasswordSyntax(password)) {
      throw new Error('Invalid password')
    }

    // Create the user
    const passwordHash = await bcrypt.hash(password, 15)
    const user = await User.create({
      email: email,
      password: passwordHash,
      role: UserRole.User,
      displayName: email.split('@')[0]
    }).save()

    // Generate a token
    const now = new Date()
    const expiry = new Date(now).setDate(now.getDate() + 30)
    const token = jwt.sign(
      {
        uid: user.id,
        iat: Math.floor(now.getTime() / 1000),
        exp: Math.floor(expiry / 1000)
      },
      process.env.JWT_SECRET
    )

    return token
  }
}
