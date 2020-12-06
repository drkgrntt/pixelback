import DataLoader from 'dataloader'
import { In } from 'typeorm'
import { Subscription } from '../entities/Subscription'

export const createSubscriptionLoader = () => {
  return new DataLoader<string, Subscription>(
    async (subscriptionIds) => {
      const subscriptions = await Subscription.find({
        where: {
          id: In(subscriptionIds as string[]),
        },
      })

      const subscriptionMap = subscriptions.reduce(
        (map, subscription) => {
          map[subscription.id] = subscription
          return map
        },
        {} as Record<string, Subscription>
      )

      const sortedSubscriptions = subscriptionIds.map(
        (subscriptionId) => subscriptionMap[subscriptionId]
      )

      return sortedSubscriptions
    }
  )
}
