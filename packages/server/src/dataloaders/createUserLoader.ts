import DataLoader from 'dataloader'
import { In } from 'typeorm'
import { User } from '../entities/User'

export const createUserLoader = () => {
  return new DataLoader<string, User>(async (userIds) => {
    const users = await User.find({
      where: {
        id: In(userIds as string[]),
      },
    })

    const userMap = users.reduce((map, user) => {
      map[user.id] = user
      return map
    }, {} as Record<string, User>)

    const sortedUsers = userIds.map((userId) => userMap[userId])

    return sortedUsers
  })
}
