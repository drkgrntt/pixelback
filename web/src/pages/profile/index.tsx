import { NextPage } from 'next'
import styles from './Profile.module.scss'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { useLogoutEverywhereMutation } from '@/mutations/useLogoutEverywhereMutation'
import Link from 'next/link'
import { useMeQuery } from '@/hooks/queries/useMeQuery'

const Profile: NextPage<{}> = () => {
  const [logoutEverywhere] = useLogoutEverywhereMutation()
  const { refetch, data } = useMeQuery()

  if (!data?.me) {
    return (
      <Card className={styles.login}>
        <Link href="/login">
          <span>
            <a className={styles.login}>Login</a> to view your
            profile.
          </span>
        </Link>
      </Card>
    )
  }

  const onLogoutEverywhereClick = async (
    event: any,
    reset: Function
  ) => {
    try {
      const result = await logoutEverywhere()
      localStorage.setItem('token', result.data.logoutEverywhere.value)
      refetch()
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
