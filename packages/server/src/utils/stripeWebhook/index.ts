import { Request, Response } from 'express'
import Stripe from 'stripe'

export default (req: Request, res: Response) => {
  const config: Stripe.StripeConfig = { apiVersion: '2020-08-27' }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, config)
  const sig = req.headers['stripe-signature'] as string

  let event

  try {
    if (process.env.STRIPE_WEBHOOK_SECRET !== 'false') {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } else {
      event = JSON.parse(req.body)
    }
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the event
  switch (event.type) {
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  // Return a res to acknowledge receipt of the event
  res.send({ received: true })
}
