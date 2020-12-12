import Stripe from 'stripe'

class Payments {
  stripe: Stripe

  constructor() {
    const config: Stripe.StripeConfig = { apiVersion: '2020-08-27' }
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, config)
  }

  async getCustomer(
    customerId?: string,
    createIfNull?: boolean
  ): Promise<Stripe.Customer | null> {
    if (!customerId && !createIfNull) return null

    if (!customerId) {
      return await this.stripe.customers.create()
    }

    const customer = await this.stripe.customers.retrieve(customerId)
    if (customer.deleted) return null
    return customer
  }

  async getPaymentMethods(
    customerId: string
  ): Promise<Stripe.CustomerSource[]> {
    const cards = await this.stripe.customers.listSources(
      customerId,
      {
        object: 'card',
      }
    )

    return cards.data
  }

  async addPaymentMethod(
    customerId: string,
    sourceId: string
  ): Promise<Stripe.CustomerSource> {
    const customer = await this.getCustomer(customerId, true)

    const source = await this.stripe.customers.createSource(
      customer?.id as string,
      { source: sourceId }
    )

    return source
  }
}

export default Payments
