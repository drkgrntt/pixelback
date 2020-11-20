import { useEffect, useState } from 'react'
import { useMeQuery } from '../hooks/useMeQuery'
import userContext from './userContext'
import { User } from '../types'

const UserProvider: React.FC<{}> = (props) => {

  const result = useMeQuery()
  const [currentUser, setUser] = useState<User | null>(null)
  useEffect(() => {
    setUser(result.data?.me)
  }, [result.data])

  const setCurrentUser = (user: User, token?: string) => {
    setUser(user)
    localStorage.setItem('token', token || '')
  }

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
