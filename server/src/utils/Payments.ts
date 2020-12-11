import Stripe from 'stripe'

class Payments {
  stripe: Stripe

  constructor() {
    const config: Stripe.StripeConfig = { apiVersion: '2020-08-27' }
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, config)
  }

  async getCustomer(
    id?: string,
    createIfNull?: boolean
  ): Promise<Stripe.Customer | Stripe.DeletedCustomer | null> {
    if (!id && !createIfNull) return null

    if (!id) {
      return await this.stripe.customers.create()
    }

    return await this.stripe.customers.retrieve(id)
  }

  async getPaymentMethods(
    id: string
  ): Promise<Stripe.CustomerSource[]> {
    const cards = await this.stripe.customers.listSources(id, {
      object: 'card',
    })

    return cards.data
  }
}

export default Payments
