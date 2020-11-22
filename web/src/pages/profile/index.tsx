import { NextPage } from 'next'
import { useContext } from 'react'
import userContext from '@/context/userContext'
import styles from './Profile.module.scss'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { useLogoutEverywhereMutation } from '@/mutations/useLogoutEverywhereMutation'
import Link from 'next/link'

const Profile: NextPage<{}> = () => {

  const { currentUser, setCurrentUser, setToken } = useContext(userContext)
  const [logoutEverywhere] = useLogoutEverywhereMutation()

  if (!currentUser) {
    return (
      <Card className={styles.login}>
        <Link href="/login">
          <span>
            <a className={styles.login}>Login</a>
            {' '}to view your profile.
          </span>
        </Link>
      </Card>
    )
  }

  const onLogoutEverywhereClick = async (event: any, reset: Function) => {
    try {
      const result = await logoutEverywhere()
      setCurrentUser(currentUser)
      setToken(result.data.logoutEverywhere.value)
    } catch (err) {

    }
    reset()
  }

  return (
    <div className={styles.profile}>
      <h2>Profile</h2>
      <Link href="/writer-dashboard">
        <a>Go to your writer's dashboard</a>
      </Link>

      <Card>
        <label>Discard all other authentication tokens to log out everywhere.</label>
        <Button styleTypes={['delete']} onClick={onLogoutEverywhereClick}>
          Discard
        </Button>
      </Card>
    </div>
  )
}

export default Profile
