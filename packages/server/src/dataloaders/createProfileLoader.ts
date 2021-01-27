import DataLoader from 'dataloader'
import { In } from 'typeorm'
import { Profile } from '../entities/Profile'

export const createProfileLoader = () => {
  return new DataLoader<string, Profile>(async (userIds) => {
    const profiles = await Profile.find({
      where: {
        userId: In(userIds as string[]),
      },
    })

    const profileMap = profiles.reduce((map, profile) => {
      map[profile.userId] = profile
      return map
    }, {} as Record<string, Profile>)

    const sortedProfiles = userIds.map((userId) => profileMap[userId])

    return sortedProfiles
  })
}
