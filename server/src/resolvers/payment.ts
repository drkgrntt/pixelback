import {
  Ctx,
  Resolver,
  UseMiddleware,
  Arg,
  Mutation,
} from 'type-graphql'
import { Context, StripeSource, UserRole } from '../types'
import { isAuth } from '../middleware/isAuth'
import Payments from '../utils/Payments'
import { User } from '../entities/User'

@Resolver()
export class PaymentResolver {
  payments = new Payments()

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
    @Arg('price') price: 'month' | 'year'
  ): Promise<User> {
    if (me.role === UserRole.Author) {
      me = await this.cancelAuthorship({ me } as Context)
    }

    const priceId = this.payments.getPriceId(price)

    await this.payments.createSubscription(me, priceId)
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

    const customer = await this.payments.getCustomer(me)
    if (!customer) return me

    const subscription = customer.subscriptions?.data.find(
      (subscription) =>
        subscription.items.data.some(
          (item) =>
            item.price.id === process.env.STRIPE_MONTHLY_PRICE_ID ||
            item.price.id === process.env.STRIPE_YEARLY_PRICE_ID
        ) && !subscription.canceled_at
    )
    if (!subscription) return me

    await this.payments.cancelSubscription(subscription.id)

    me.role = UserRole.Writer
    await me.save()

    return me
  }
}
