import { NextPage } from 'next'
import styles from './Profile.module.scss'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { useLogoutEverywhereMutation } from '@/mutations/useLogoutEverywhereMutation'
import Link from 'next/link'
import { useIsAuth } from '@/hooks/useIsAuth'
import Loader from '@/components/Loader'

const Profile: NextPage<{}> = () => {
  const [logoutEverywhere] = useLogoutEverywhereMutation()
  const { loading } = useIsAuth()

  if (loading) {
    return <Loader />
  }

  const onLogoutEverywhereClick = async (
    event: any,
    reset: Function
  ) => {
    try {
      await logoutEverywhere()
    } catch (err) {}
    reset()
  }

  return (
    <div className={styles.profile}>
      <h2>Profile</h2>
      <Link href="/writer-dashboard">
        <a>Go to your writer's dashboard</a>
      </Link>

      <Card>
        <label>
          Discard all other authentication tokens to log out
          everywhere.
        </label>
        <Button
          styleTypes={['delete']}
          onClick={onLogoutEverywhereClick}
        >
          Discard
        </Button>
      </Card>
    </div>
  )
}

export default Profile
