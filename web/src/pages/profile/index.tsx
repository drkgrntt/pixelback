import { NextPage } from 'next'
import Error from 'next/error'
import styles from './Profile.module.scss'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { useLogoutEverywhereMutation } from '@/mutations/useLogoutEverywhereMutation'
import Link from 'next/link'
import { useIsAuth } from '@/hooks/useIsAuth'
import Loader from '@/components/Loader'
import StoryList from '@/components/StoryList'
import { useMeQuery } from '@/hooks/queries/useMeQuery'

const Profile: NextPage<{}> = () => {
  const [logoutEverywhere] = useLogoutEverywhereMutation()
  const { loading, data } = useMeQuery()
  useIsAuth()

  if (loading) {
    return <Loader />
  }

  if (!data?.me) {
    return <Error statusCode={401} />
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

      <Card>
        <h3>User Info</h3>
      </Card>

      <Card>
        <h3>Favorite Authors</h3>
      </Card>

      <Card>
        <h3>Favorite Stories</h3>
        <StoryList stories={data.me.favoriteStories} />
      </Card>

      <Card>
        <h3>Favorite Genres</h3>
      </Card>
    </div>
  )
}

export default Profile
