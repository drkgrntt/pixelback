import {
  Ctx,
  Resolver,
  UseMiddleware,
  Arg,
  Mutation,
} from 'type-graphql'
import { Context, StripeSource } from '../types'
import { isAuth } from '../middleware/isAuth'
import Payments from '../utils/Payments'

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
}
