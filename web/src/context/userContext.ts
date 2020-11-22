import { User } from '../types'
import { createContext } from 'react'

type UserContext = {
  currentUser: User | null
  setCurrentUser: Function,
  setToken: Function
}

export default createContext<UserContext>({
  currentUser: {
    id: '',
    email: '',
    role: 0,
    displayName: '',
    stories: [],
    ratings: [],
    subscriptions: [],
    subscribers: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  setCurrentUser: (user: User) => {},
  setToken: (token: string) => {}
})
