import DataLoader from 'dataloader'
import { Subscription } from '../entities/Subscription'
import { In } from 'typeorm'

interface LoaderKey {
  subscriberId?: string
  subscribedToId?: string
}

export const createSubscriptionIdsLoader = () => {
  return new DataLoader<LoaderKey, string[]>(async (loaderKeys) => {
    const subscriberIds = loaderKeys
      .filter((key) => key.subscriberId)
      .map((key) => key.subscriberId)
    const subscribedToIds = loaderKeys
      .filter((key) => key.subscribedToId)
      .map((key) => key.subscribedToId)

    const subscriptions = await Subscription.find({
      select: ['id', 'subscriberId', 'subscribedToId'],
      where: [
        {
          subscriberId: In(subscriberIds),
        },
        {
          subscribedToId: In(subscribedToIds),
        },
      ],
    })

    // Essentially is of type Record<subscriberId: subscriptionId[]>
    const subscriberIdsMap = subscriptions.reduce(
      (map, subscription) => {
        map[subscription.subscriberId] = subscriptions.map(
          (sub) => sub.id
        )
        return map
      },
      {} as Record<string, string[]>
    )

    // Essentially is of type Record<subscribedToId: subscriptionId[]>
    const subscribedToIdsMap = subscriptions.reduce(
      (map, subscription) => {
        map[subscription.subscribedToId] = subscriptions.map(
          (sub) => sub.id
        )
        return map
      },
      {} as Record<string, string[]>
    )

    const sortedSubscriptionIds = loaderKeys.map((loaderKey) => {
      if (loaderKey.subscribedToId) {
        return subscribedToIdsMap[loaderKey.subscribedToId]
      } else if (loaderKey.subscriberId) {
        return subscriberIdsMap[loaderKey.subscriberId]
      }
      return []
    })

    return sortedSubscriptionIds
  })
}
