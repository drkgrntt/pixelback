import DataLoader from 'dataloader'
import { Subscription } from '../entities/Subscription'
import { In } from 'typeorm'

export const createSubscriptionIdsBySubscribedToLoader = () => {
  return new DataLoader<string, string[]>(async (subscribedToIds) => {
    const subscriptions = await Subscription.find({
      select: ['id', 'subscribedToId'],
      where: {
        subscribedToId: In(subscribedToIds as string[]),
      },
    })

    // Essentially is of type Record<subscribedToId: subscriptionId[]>
    const subscriptionIdsMap = subscriptions.reduce(
      (map, subscription) => {
        map[subscription.subscribedToId] = subscriptions
          .filter(
            (sub) =>
              subscription.subscribedToId === sub.subscribedToId
          )
          .map((sub) => sub.id)
        return map
      },
      {} as Record<string, string[]>
    )

    const sortedSubscriptionIds = subscribedToIds.map(
      (id) => subscriptionIdsMap[id] || []
    )

    return sortedSubscriptionIds
  })
}
