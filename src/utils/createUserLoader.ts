import DataLoader from 'dataloader'
import { User } from '../entities/User'

export const createUserLoader = () => {
  return new DataLoader<string, User>(async userIds => {
    const users = await User.findByIds(userIds as string[])
    const userIdToUser: Record<string, User> = {}
    users.forEach(user => {
      userIdToUser[user.id] = user
    })

    const sortedUsers = userIds.map(userId => userIdToUser[userId])
    
    return sortedUsers
  })
}
