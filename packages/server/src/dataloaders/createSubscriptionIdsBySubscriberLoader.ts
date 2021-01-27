import DataLoader from 'dataloader'
import { Subscription } from '../entities/Subscription'
import { In } from 'typeorm'

export const createSubscriptionIdsBySubscriberLoader = () => {
  return new DataLoader<string, string[]>(async (subscriberIds) => {
    const subscriptions = await Subscription.find({
      select: ['id', 'subscriberId'],
      where: {
        subscriberId: In(subscriberIds as string[]),
      },
    })

    // Essentially is of type Record<subscriberId: subscriptionId[]>
    const subscriptionIdsMap = subscriptions.reduce(
      (map, subscription) => {
        map[subscription.subscriberId] = subscriptions
          .filter(
            (sub) => subscription.subscriberId === sub.subscriberId
          )
          .map((sub) => sub.id)
        return map
      },
      {} as Record<string, string[]>
    )

    const sortedSubscriptionIds = subscriberIds.map(
      (id) => subscriptionIdsMap[id] || []
    )

    return sortedSubscriptionIds
  })
}
