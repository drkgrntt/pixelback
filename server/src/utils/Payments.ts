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

  async removePaymentMethod(
    user: User,
    sourceId: string
  ): Promise<boolean> {
    let paymentMethod = await this.stripe.paymentMethods.retrieve(
      sourceId
    )
    if (paymentMethod?.customer !== user.stripeCustomerId) {
      return false
    }

    await this.stripe.paymentMethods.detach(sourceId)
    return true
  }

  getPriceId(price: 'month' | 'year') {
    switch (price) {
      case 'month':
        return process.env.STRIPE_MONTHLY_PRICE_ID

      case 'year':
        return process.env.STRIPE_YEARLY_PRICE_ID

      default:
        throw new Error('Price must be "month" or "year"')
    }
  }

  async getSubscriptions(user: User): Promise<Stripe.Subscription[]> {
    if (!user.stripeCustomerId) return []

    const subscriptions = await this.stripe.subscriptions.list({
      customer: user.stripeCustomerId,
    })

    return subscriptions.data
  }

  getAuthorshipSubscription(
    subscriptions: Stripe.Subscription[]
  ): Stripe.Subscription | undefined {
    return subscriptions.find(
      (subscription) =>
        subscription.items.data.some(
          (item) =>
            item.price.id === process.env.STRIPE_MONTHLY_PRICE_ID ||
            item.price.id === process.env.STRIPE_YEARLY_PRICE_ID
        ) && !subscription.canceled_at
    )
  }

  async createSubscription(
    user: User,
    priceId: string,
    sourceId: string
  ): Promise<Stripe.Subscription | null> {
    const customer = await this.getCustomer(user, true)
    if (!customer) return null

    const subscription = await this.stripe.subscriptions.create({
      default_payment_method: sourceId,
      customer: customer.id,
      items: [{ price: priceId }],
    })

    return subscription
  }

  async cancelSubscription(
    subscriptionId: string
  ): Promise<Stripe.Subscription | null> {
    const deleted = await this.stripe.subscriptions.del(
      subscriptionId
    )

    return deleted
  }
}

export default Payments
