import {
  Ctx,
  Resolver,
  UseMiddleware,
  Arg,
  Mutation,
  Query,
} from 'type-graphql'
import { Context, StripeSource, UserRole } from '../types'
import { isAuth } from '../middleware/isAuth'
import Payments from '../utils/Payments'
import { User } from '../entities/User'

@Resolver()
export class PaymentResolver {
  payments = new Payments()

  @Query(() => String, { nullable: true })
  @UseMiddleware(isAuth)
  async linkAccount(
    @Ctx() { me }: Context
  ): Promise<string | undefined> {
    const account = await this.payments.getAccount(me, true)
    if (!account) return
    const res = await this.payments.linkAccount(account)
    return res.url
  }

  @Mutation(() => StripeSource)
  @UseMiddleware(isAuth)
  async addPaymentMethod(
    @Arg('sourceId') sourceId: string,
    @Ctx() { me }: Context
  ): Promise<StripeSource> {
    const paymentMethod = await this.payments.addPaymentMethod(
      me,
      sourceId
    )
    return paymentMethod
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async removePaymentMethod(
    @Ctx() { me }: Context,
    @Arg('sourceId') sourceId: string
  ): Promise<string> {
    await this.payments.removePaymentMethod(me, sourceId)
    return sourceId
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async becomeAuthor(
    @Ctx() { me }: Context,
    @Arg('sourceId') sourceId: string,
    @Arg('price') price: 'month' | 'year'
  ): Promise<User> {
    if (me.role === UserRole.Author) {
      me = await this.cancelAuthorship({ me } as Context)
    }

    const priceId = this.payments.getPriceId(price)

    await this.payments.createSubscription(me, priceId, sourceId)
    me.role = UserRole.Author
    await me.save()

    return me
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async cancelAuthorship(@Ctx() { me }: Context): Promise<User> {
    if (me.role !== UserRole.Author) {
      throw new Error('Only authors can cancel their authorship')
    }

    const subscriptions = await this.payments.getSubscriptions(me)
    const subscription = this.payments.getAuthorshipSubscription(
      subscriptions
    )

    if (!subscription) return me

    await this.payments.cancelSubscription(subscription.id)

    me.role = UserRole.Writer
    await me.save()

    return me
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async tipAuthor(
    @Ctx() { me, userLoader }: Context,
    @Arg('amount') amount: number,
    @Arg('authorId') authorId: string,
    @Arg('sourceId') sourceId: string
  ): Promise<boolean> {
    const author = await userLoader.load(authorId)
    if (!author) return false

    const description = `Pixelback tip for ${author.penName}`
    const charge = await this.payments.createCharge(
      me,
      author,
      amount,
      sourceId,
      description
    )

    return !!charge
  }
}
