import {
  Ctx,
  Query,
  Resolver,
} from 'type-graphql'
import { User } from '../entities/User'

@Resolver(User)
export class UserResolver {

  @Query(() => User, { nullable: true })
  me(@Ctx() { me }: any) {
    return me;
  }
}
