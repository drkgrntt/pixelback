import { NextPage } from 'next'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import Loader from '@/components/Loader'
import {
  useUnsubscribeMutation,
  useSubscribeMutation,
  useMeQuery,
  useUserQuery,
  User,
} from '@pixelback/shared'
import { withApollo } from '@/utils/withApollo'
import styles from './[userId].module.scss'
import Modal from '@/components/Modal'
import Card from '@/components/Card'
import TipForm from '@/components/TipForm'
import StoryList from '@/components/StoryList'
import Button from '@/components/Button'

interface Props {
  query: ParsedUrlQuery
}

const UserPage: NextPage<Props> = ({ query }) => {
  const { push } = useRouter()
  const [subscribe] = useSubscribeMutation()
  const [unsubscribe] = useUnsubscribeMutation()
  const variables = { id: query?.userId }
  const skip = !query?.userId
  const { data: userData, loading, refetch } = useUserQuery({
    variables,
    skip,
  })
  const { data: meData } = useMeQuery()
  const user: User = userData?.user
  const me: User = meData?.me

  if (loading) {
    return <Loader />
  }

  if (!user) {
    return <Error statusCode={404} />
  }

  const isSubscribed = me?.subscriptions.some(
    (sub) => sub.subscribedTo.id === user.id
  )

  const handleFollow = async (event: any, reset: Function) => {
    if (!me) {
      const initialValidation = 'You need to login to do that'
      push(
        `/login?next=/profile/${user.id}&initialValidation=${initialValidation}`
      )
      return
    }

    if (isSubscribed) {
      const subscription = me.subscriptions.find(
        (sub) => sub.subscribedTo.id === user.id
      )
      await unsubscribe({ variables: { id: subscription?.id } })
      await refetch()
    } else {
      await subscribe({ variables: { id: user.id } })
      await refetch()
    }
    reset()
  }

  return (
    <div className={styles.profile}>
      <div>
        <h2>{user.penName}</h2>
        <p>{user.subscribers.length} followers</p>
      </div>

      <div className={styles.actions}>
        <Button styleTypes={['cta']} onClick={handleFollow}>
          {isSubscribed ? 'Following' : 'Follow'}
        </Button>
        {user.canAcceptPayments && (
          <Modal
            buttonText="Tip the author"
            className={styles.tipModal}
          >
            <h3>Tip {user.penName}</h3>
            <TipForm author={user} />
          </Modal>
        )}
      </div>

      <hr className={styles.hr} />

      <div className={styles.stories}>
        <h3>Stories</h3>
        <StoryList cardWrap stories={user.stories} />
      </div>
    </div>
  )
}

UserPage.getInitialProps = ({ query }) => {
  return { query }
}

export default withApollo({ ssr: true })(UserPage as any)
