import { useEffect, useState } from 'react'
import { useMeQuery } from '../hooks/useMeQuery'
import userContext from './userContext'
import { User } from '../types'

const UserProvider: React.FC<{}> = (props) => {

  const [currentUser, setUser] = useState<User | null>(null)

  const setCurrentUser = (user: User | null, token?: string) => {
    setUser(user)
    if (!user) {
      localStorage.removeItem('token')
    }
    if (typeof token === 'string') {
      localStorage.setItem('token', token)
    }
  }

  let data: { me: User | null } = { me: null }
  try {
    const result = useMeQuery()
    data = result.data
  } catch (err) {
    setCurrentUser(null, '')
  }
  useEffect(() => {
    setUser(data?.me)
  }, [data])

  return (
    <userContext.Provider
      value={{
        currentUser,
        setCurrentUser
      }}
    >
      {props.children}
    </userContext.Provider>
  )
}

export default UserProvider
