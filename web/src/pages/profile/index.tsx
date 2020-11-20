import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import userContext from '../../context/userContext'
import styles from './Profile.module.scss'

const Profile: React.FC<{}> = () => {

  const { currentUser } = useContext(userContext)
  const { push } = useRouter()

  // Reroute if no user
  useEffect(() => {
    if (!currentUser) push('/login')
  }, [currentUser])
  if (!currentUser) return null

  return (
    <div className={styles.profile}>
      This is the profile page.
    </div>
  )
}

export default Profile
