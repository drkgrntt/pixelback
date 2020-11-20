import { useEffect, useState } from 'react'
import { useMeQuery } from '../hooks/useMeQuery'
import userContext from './userContext'
import { User } from '../types'

const UserProvider: React.FC<{}> = (props) => {

  const [currentUser, setUser] = useState<User | null>(null)

  let data: { me: User | null }
  try {
    const result = useMeQuery()
    data = result.data
  } catch (err) {
    data = { me: null }
  }
  useEffect(() => {
    setCurrentUser(data?.me)
  }, [data])

  const setCurrentUser = (user: User | null, token?: string) => {
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
