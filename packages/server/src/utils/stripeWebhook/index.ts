import { Request, Response } from 'express'
import Stripe from 'stripe'
import handleFailedInvoicePayment from './handleFailedInvoicePayment'

export default async (req: Request, res: Response) => {
  const config: Stripe.StripeConfig = { apiVersion: '2020-08-27' }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, config)
  const sig = req.headers['stripe-signature'] as string

  let event: Stripe.Event

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
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the event
  switch (event.type) {
    case 'invoice.payment_failed':
      await handleFailedInvoicePayment(event)
      break

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  // Return a res to acknowledge receipt of the event
  return res.send({ received: true })
}
