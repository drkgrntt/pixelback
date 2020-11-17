import DataLoader from 'dataloader'
import { Subscription } from '../entities/Subscription'

export const createSubscriptionLoader = () => {
  return new DataLoader<
    { subscriberId: string; subscribedToId: string },
    Subscription
  >(async (keys) => {
    const subscriptions = await Subscription.findByIds(keys as any[])
    const subscriptionIdToSubscription: Record<
      string,
      Subscription
    > = {}
    subscriptions.forEach((subscription) => {
      const key = `${subscription.subscriberId}|${subscription.subscribedToId}`
      subscriptionIdToSubscription[key] = subscription
    })

    const sortedSubscriptions = keys.map(
      (key) =>
        subscriptionIdToSubscription[
          `${key.subscriberId}|${key.subscribedToId}`
        ]
    )

    return sortedSubscriptions
  })
}
