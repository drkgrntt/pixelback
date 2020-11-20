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
      This is the profile page.
      <Button styleTypes={['delete']} onClick={onLogoutEverywhereClick}>
        Logout Everywhere
      </Button>
    </div>
  )
}

export default Profile
