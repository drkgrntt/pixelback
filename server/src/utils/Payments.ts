import Stripe from 'stripe'
import { User } from '../entities/User'
import { StripeSource } from '../types'

class Payments {
  stripe: Stripe

  constructor() {
    const config: Stripe.StripeConfig = { apiVersion: '2020-08-27' }
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, config)
  }

  async getCustomer(
    user: User,
    createIfNull?: boolean
  ): Promise<Stripe.Customer | null> {
    if (!user.stripeCustomerId && !createIfNull) return null

    if (!user.stripeCustomerId) {
      const customer = await this.stripe.customers.create({
        email: user.email,
      })
      user.stripeCustomerId = customer.id
      await user.save()
      return customer
    }

    const customer = await this.stripe.customers.retrieve(
      user.stripeCustomerId
    )
    if (customer.deleted) return null

    return customer
  }

  async getPaymentMethods(user: User): Promise<StripeSource[]> {
    const paymentMethods = await this.stripe.paymentMethods.list({
      type: 'card',
      customer: user.stripeCustomerId,
    })

    const cards = paymentMethods.data
      .filter((pm) => pm)
      .map((pm) => new StripeSource(pm))

    return cards
  }

  async addPaymentMethod(
    user: User,
    sourceId: string
  ): Promise<StripeSource> {
    const customer = await this.getCustomer(user, true)

    const paymentMethod = await this.stripe.paymentMethods.attach(
      sourceId,
      { customer: customer?.id as string }
    )

    return new StripeSource(paymentMethod)
  }
}

export default Payments
