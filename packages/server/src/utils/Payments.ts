import Stripe from 'stripe'
import { User } from '../entities/User'
import { StripeSource, UserRole } from '../types'

class Payments {
  stripe: Stripe

  constructor() {
    const config: Stripe.StripeConfig = { apiVersion: '2020-08-27' }
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, config)
  }

  async getAccount(
    user: User,
    createIfNull?: boolean
  ): Promise<Stripe.Account | null> {
    if (!user.stripeAccountId && !createIfNull) return null

    if (!user.stripeAccountId) {
      const account = await this.stripe.accounts.create({
        type: 'express',
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        email: user.email,
      })
      user.stripeAccountId = account.id
      await user.save()
      return account
    }

    const account = await this.stripe.accounts.retrieve(
      user.stripeAccountId
    )
    return account
  }

  async linkAccount(
    account: Stripe.Account
  ): Promise<Stripe.AccountLink> {
    const accountLinks = await this.stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.APP_BASE_URL}/writer-dashboard`,
      return_url: `${process.env.APP_BASE_URL}/writer-dashboard`,
      type: 'account_onboarding',
    })

    return accountLinks
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

  async giveFreeTrial(
    user: User,
    priceId: string,
    duration: number
  ): Promise<Stripe.Subscription | null> {
    const customer = await this.getCustomer(user, true)
    if (!customer) return null

    const subscription = await this.stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      trial_period_days: duration,
    })

    return subscription
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

  async createCharge(
    author: User,
    amount: number,
    sourceId: string,
    description: string,
    user?: User
  ): Promise<Stripe.PaymentIntent | null> {
    const account = await this.getAccount(author, true)
    if (!account) return null
    const accountObj = {
      stripeAccount: author.stripeAccountId,
    }

    const clonedPaymentMethod = await this.stripe.paymentMethods.create(
      {
        customer: user?.stripeCustomerId,
        payment_method: sourceId,
      },
      accountObj
    )

    amount = amount * 100 // convert to cents

    let application_fee_amount = amount * 0.1 // 8%
    if (author.role === UserRole.Author) {
      application_fee_amount = application_fee_amount / 2 // 4%
    }

    const paymentIntent = await this.stripe.paymentIntents.create(
      {
        amount: amount,
        application_fee_amount,
        currency: 'usd',
        payment_method_types: ['card'],
        payment_method: clonedPaymentMethod.id,
        description,
        confirm: true,
      },
      accountObj
    )

    return paymentIntent
  }
}

export default Payments
