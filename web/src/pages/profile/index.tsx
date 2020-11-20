import { useContext } from 'react'
import userContext from '../../context/userContext'
import styles from './Profile.module.scss'
import Button from '../../components/Button'
import { useLogoutEverywhereMutation } from '../../hooks/useLogoutEverywhereMutation'

const Profile: React.FC<{}> = () => {

  const { currentUser, setCurrentUser } = useContext(userContext)
  const [logoutEverywhere] = useLogoutEverywhereMutation()

  if (!currentUser) return null

  const onLogoutEverywhereClick = async (event: any, reset: Function) => {
    try {
      const result = await logoutEverywhere()
      setCurrentUser(currentUser, result.data.logoutEverywhere.value)
    } catch (err) {

    }
    reset()
  }

  return (
    <div className={styles.profile}>
      <h2>Profile</h2>
      <p>Discard all other authentication tokens to log out everywhere.</p>
      <Button styleTypes={['delete']} onClick={onLogoutEverywhereClick}>
        Discard
      </Button>
    </div>
  )
}

export default Profile
