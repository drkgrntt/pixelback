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
import PasswordResetForm from '@/components/PasswordResetForm'
import { useMeQuery } from '@/queries/useMeQuery'
import { Story, User } from '@/types'
import { useRemoveFavoriteStoryMutation } from '@/mutations/useRemoveFavoriteStoryMutation'
import Modal from '@/components/Modal'
import { ParsedUrlQuery } from 'querystring'
import { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { useExchangeTokenMutation } from '@/hooks/mutations/useExchangeTokenMutation'

interface Props {
  query: ParsedUrlQuery
}

const Profile: NextPage<Props> = ({ query }) => {
  const [initialized, setInitialized] = useState(false)
  const [exchangeToken] = useExchangeTokenMutation()
  // There must be a better way to handle this.
  // The problem is if I put this in a useEffect,
  // the "me" query gets called without the token and it's too late
  if (!initialized && query.token && typeof window !== 'undefined') {
    localStorage.setItem('token', query.token as string)
  }
  useEffect(() => {
    setInitialized(true)
  }, [setInitialized])
  const [logoutEverywhere] = useLogoutEverywhereMutation()
  const [removeFavoriteStory] = useRemoveFavoriteStoryMutation()
  const { loading, data } = useMeQuery()
  const me: User = data?.me
  useIsAuth(!initialized)
  useEffect(() => {
    if (me && query.token) exchangeToken()
  }, [me, query.token])

  if (loading) {
    return <Loader />
  }

  if (!me) {
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

  const onRemoveStoryClick = async (story: Story) => {
    await removeFavoriteStory({ variables: { storyId: story.id } })
  }

  const renderAuthorList = () => {
    return me.subscriptions.map((subscription) => {
      return (
        <li key={subscription.id}>
          <Link href={`/profile/${subscription.subscribedTo.id}`}>
            <a>{subscription.subscribedTo.penName}</a>
          </Link>
        </li>
      )
    })
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
        <hr />
        <ul>
          <li>Email (no one sees this but you): {me.email}</li>
          <li>Pen Name: {me.penName}</li>
        </ul>
        <Modal
          closeId="close-password-reset-form"
          buttonText="Reset password"
        >
          <PasswordResetForm
            onSuccess={() => {
              const close = document.getElementById(
                'close-password-reset-form'
              )
              close?.click()
            }}
          />
        </Modal>
      </Card>

      <Card>
        <h3>Favorite Authors</h3>
        <hr />
        <ul>{renderAuthorList()}</ul>
      </Card>

      <Card>
        <h3>Favorite Stories</h3>
        <hr />
        <StoryList
          actionText="Remove"
          action={onRemoveStoryClick}
          stories={me.favoriteStories}
        />
      </Card>

      {/* <Card>
        <h3>Favorite Genres</h3>
      </Card> */}
    </div>
  )
}

Profile.getInitialProps = ({ query }) => {
  return { query }
}

export default Profile
