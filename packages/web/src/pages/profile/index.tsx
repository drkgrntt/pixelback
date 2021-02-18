import { ParsedUrlQuery } from 'querystring'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Error from 'next/error'
import styles from './Profile.module.scss'
import Button from '@/components/Button'
import Card from '@/components/Card'
import {
  useRemovePaymentMethodMutation,
  useExchangeTokenMutation,
  useRemoveFavoriteStoryMutation,
  useLogoutEverywhereMutation,
  useMeQuery,
  Comment,
  Story,
  StripeSource,
  User,
} from '@pixelback/shared'
import Loader from '@/components/Loader'
import StoryList from '@/components/StoryList'
import PasswordResetForm from '@/components/PasswordResetForm'
import PenNameForm from '@/components/PenNameForm'
import Modal from '@/components/Modal'
import { withApollo } from '@/utils/withApollo'
import CreditCardForm from '@/components/CreditCardForm'
import { useRouter } from 'next/router'

interface Props {
  query: ParsedUrlQuery
}

const Profile: NextPage<Props> = ({ query }) => {
  const [wait, setWait] = useState(!!query.token)
  const [exchangeToken] = useExchangeTokenMutation()
  const [logoutEverywhere, logoutData] = useLogoutEverywhereMutation()
  const [removeFavoriteStory] = useRemoveFavoriteStoryMutation()
  const [removePaymentMethod] = useRemovePaymentMethodMutation()
  const { called, loading, data, refetch } = useMeQuery()
  const router = useRouter()
  const me: User = data?.me
  useEffect(() => {
    if (query.token && refetch) {
      exchangeToken({
        variables: { token: query.token },
      })
        .then(async () => {
          await refetch()
          setWait(false)
        })
        .catch(() => {
          setWait(false)
        })
    }
  }, [query.token, refetch, setWait])
  useEffect(() => {
    if (called && !loading && !data?.me && !wait) {
      router.replace(`/login?next=${router.pathname}`)
    }
  }, [called, loading, data, wait])

  if (loading) {
    return <Loader />
  }

  if (!me && !wait) {
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

  const renderEdited = (comment: Comment) => {
    const createdAt = new Date(comment.createdAt)
    const updatedAt = new Date(comment.updatedAt)
    if (createdAt.toISOString() === updatedAt.toISOString()) return

    return <p>(edited {updatedAt.toLocaleDateString()})</p>
  }

  const renderComments = () => {
    return me.comments
      .map((comment) => {
        let link = '/stories'
        if (comment.story) {
          link = `${link}/${comment.story?.id}`
        } else {
          link = `${link}/${comment.chapter?.story.id}/chapters/${comment.chapter?.id}`
        }
        return (
          <Card key={comment.id}>
            <Link href={link}>
              <h4>
                {comment.story?.title || comment.chapter?.title}
              </h4>
            </Link>
            <p>{comment.body}</p>
            <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
            {renderEdited(comment)}
          </Card>
        )
      })
      .reverse()
  }

  const handleRemovePaymentMethod = async (
    paymentMethod: StripeSource
  ) => {
    const confirm = window.confirm(
      `Are you sure you want to remove ${paymentMethod.name}?`
    )
    if (!confirm) return

    await removePaymentMethod({
      variables: { sourceId: paymentMethod.id },
    })
  }

  return (
    <div className={styles.profile}>
      <div className={styles.userInfoHeader}>
        <h2>Profile</h2>
        <Modal closeId="close-pen-name-form" buttonText="Edit">
          <h2>Set a new pen name</h2>
          <PenNameForm
            onSuccess={() => {
              const close = document.getElementById(
                'close-pen-name-form'
              )
              close?.click()
            }}
          />
        </Modal>
      </div>

      <Link href="/writer-dashboard">
        <a>Go to your writer's dashboard</a>
      </Link>

      <div className={styles.userInfo}>
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
      </div>

      <hr className={styles.hr} />

      <div className={styles.favoriteAuthors}>
        <h3>Favorite Authors</h3>
        <ul>{renderAuthorList()}</ul>
      </div>

      <hr className={styles.hr} />

      <div className={styles.favoriteStories}>
        <h3>Favorite Stories</h3>
        <StoryList
          cardWrap
          actionText="Remove"
          action={onRemoveStoryClick}
          stories={me.favoriteStories}
        />
      </div>

      <hr className={styles.hr} />

      <div className={styles.paymentMethods}>
        <h3>Payment Methods</h3>
        {me.paymentMethods.map((source) => (
          <Card key={source.id} className={styles.card}>
            <div>
              <h4 className={styles.cardBrand}>
                {source.brand} *{source.last4}
              </h4>
              <span>
                exp. {source.expMonth}/{source.expYear}
              </span>
            </div>
            <a onClick={() => handleRemovePaymentMethod(source)}>
              Remove
            </a>
          </Card>
        ))}
        <br />
        <CreditCardForm />
      </div>

      {/* <Card>
        <h3>Favorite Genres</h3>
      </Card> */}
      <hr className={styles.hr} />

      <div className={styles.comments}>
        <h3>Comments</h3>
        {renderComments()}
      </div>

      <hr className={styles.hr} />

      <Button
        styleTypes={['delete']}
        onClick={onLogoutEverywhereClick}
      >
        Log Out Everywhere
      </Button>
      <p>
        {logoutData?.data?.logoutEverywhere?.value &&
          'All tokens have now been discarded. Your current session is the only remaining valid session.'}
      </p>
    </div>
  )
}

Profile.getInitialProps = ({ res, query }) => {
  return { query }
}

export default withApollo({ ssr: false })(Profile)
