import { useContext } from 'react'
import userContext from '../../context/userContext'
import styles from './Profile.module.scss'
import Button from '../../components/Button'
import Card from '../../components/Card'
import { useLogoutEverywhereMutation } from '../../hooks/useLogoutEverywhereMutation'
import Link from 'next/link'

const Profile: React.FC<{}> = () => {

  const { currentUser, setCurrentUser } = useContext(userContext)
  const [logoutEverywhere] = useLogoutEverywhereMutation()

  if (!currentUser) {
    return (
      <Card className={styles.login}>
        <Link href="/login">
          <a className={styles.login}>Login</a>
        </Link>
        {' '}to view your profile.
      </Card>
    )
  }

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

      <Card className={styles.card}>
        <label>Discard all other authentication tokens to log out everywhere.</label>
        <Button styleTypes={['delete']} onClick={onLogoutEverywhereClick}>
          Discard
        </Button>
      </Card>
    </div>
  )
}

export default Profile