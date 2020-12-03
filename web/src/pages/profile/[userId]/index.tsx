import { NextPage } from 'next'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import Loader from '@/components/Loader'
import { useUserQuery } from '@/hooks/queries/useUserQuery'
import { withApollo } from '@/utils/withApollo'
import styles from './[userId].module.scss'
import { User } from '@/types'
import Card from '@/components/Card'
import StoryList from '@/components/StoryList'
import Button from '@/components/Button'
import { useMeQuery } from '@/hooks/queries/useMeQuery'
import { useSubscribeMutation } from '@/mutations/useSubscribeMutation'
import { useUnsubscribeMutation } from '@/mutations/useUnsubscribeMutation'

interface Props {
  query: ParsedUrlQuery
}

const UserPage: NextPage<Props> = ({ query }) => {
  const { push } = useRouter()
  const [subscribe] = useSubscribeMutation()
  const [unsubscribe] = useUnsubscribeMutation()
  const variables = { id: query?.userId }
  const skip = !query?.userId
  const { data: userData, loading } = useUserQuery({
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
    } else {
      await subscribe({ variables: { id: user.id } })
    }
    reset()
  }

  return (
    <div>
      <h2>{user.penName}</h2>

      <Button styleTypes={['cta']} onClick={handleFollow}>
        {isSubscribed ? 'Unfollow' : 'Follow'}
      </Button>

      <Card>
        <h3>Stories</h3>
        <hr />
        <StoryList stories={user.stories} />
      </Card>

      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  )
}

UserPage.getInitialProps = ({ query }) => {
  return { query }
}

export default withApollo({ ssr: true })(UserPage as any)
