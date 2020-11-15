import { Ctx, Resolver, FieldResolver, Root } from 'type-graphql'
import { User } from '../entities/User'
import { Subscription } from '../entities/Subscription'
import { Context } from '../types'

@Resolver(Subscription)
export class SubscriptionResolver {
  @FieldResolver(() => User)
  async subscriber(
    @Root() subscription: Subscription,
    @Ctx() { userLoader }: Context
  ) {
    return await userLoader.load(subscription.subscriberId)
  }

  @FieldResolver(() => User)
  async subscribedTo(
    @Root() subscription: Subscription,
    @Ctx() { userLoader }: Context
  ) {
    return await userLoader.load(subscription.subscribedToId)
  }
}
