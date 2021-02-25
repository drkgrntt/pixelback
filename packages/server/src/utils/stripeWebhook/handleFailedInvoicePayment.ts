import Stripe from 'stripe'
import Payments from '../Payments'
import { User } from '../../entities/User'
import { UserRole } from '../../types'

export default async (event: Stripe.Event): Promise<void> => {
  const invoice = event.data.object as Stripe.Invoice
  if (!invoice.subscription) return

  const user = await User.findOne({
    where: {
      stripeCustomerId: invoice.customer,
    },
  })
  if (!user) return

  const payments = new Payments()
  const subscriptions = await payments.getSubscriptions(user)
  const subscription = payments.getAuthorshipSubscription(
    subscriptions
  )

  let subId = invoice.subscription
  if (typeof subId !== 'string') {
    subId = subId.id
  }

  if (subscription?.id !== subId) return

  if (user.role === UserRole.Author) {
    user.role = UserRole.Writer
    await user.save()
  }

  await payments.cancelSubscription(subscription.id)
}
