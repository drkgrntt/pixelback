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
import { User } from 'src/entities/User'

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
    let priceId
    switch (price) {
      case 'month':
        priceId = process.env.STRIPE_MONTHLY_PRICE_ID
        break

      case 'year':
        priceId = process.env.STRIPE_YEARLY_PRICE_ID
        break

      default:
        throw new Error('Price must be "month" or "year"')
    }

    await this.payments.createSubscription(me, priceId)
    me.role = UserRole.Author
    await me.save()

    return me
  }
}
