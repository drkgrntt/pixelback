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
  @Mutation(() => StripeSource)
  @UseMiddleware(isAuth)
  async addPaymentMethod(
    @Arg('sourceId') sourceId: string,
    @Ctx() { me }: Context
  ): Promise<StripeSource> {
    const payments = new Payments()
    const paymentMethod = await payments.addPaymentMethod(
      me,
      sourceId
    )
    return paymentMethod
  }
}
