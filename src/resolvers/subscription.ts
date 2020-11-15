import {
  Ctx,
  Resolver,
  FieldResolver,
  Root,
  Mutation,
  Arg,
} from 'type-graphql'
import { User } from '../entities/User'
import { Subscription } from '../entities/Subscription'
import { Context, SubLevel } from '../types'

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

  @Mutation(() => Subscription)
  async subscribe(@Ctx() { me }: Context, @Arg('id') id: string) {
    const subscription = await Subscription.create({
      level: SubLevel.Free,
      subscribedToId: id,
      subscriberId: me.id
    }).save()

    return subscription
  }
}
