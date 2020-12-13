import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './WriterDashboard.module.scss'
import Card from '@/components/Card'
import {
  Story,
  StripeSource,
  SubLevel,
  Subscription,
  UserRole,
} from '@/types'
import Button from '@/components/Button'
import CreditCardForm from '@/components/CreditCardForm'
import { useMeQuery } from '@/queries/useMeQuery'
import { useIsAuth } from '@/hooks/useIsAuth'
import Loader from '@/components/Loader'
import { withApollo } from '@/utils/withApollo'
import Input from '@/components/Input'
import { useBecomeAuthorMutation } from '@/mutations/useBecomeAuthorMutation'
import { useForm } from '@/hooks/useForm'
import { useCancelAuthorshipMutation } from '@/hooks/mutations/useCancelAuthorshipMutation'

const WriterDashboard: NextPage<{}> = () => {
  const { loading, data } = useMeQuery()
  const { push } = useRouter()
  const [becomeAuthor] = useBecomeAuthorMutation()
  const [cancelAuthorship] = useCancelAuthorshipMutation()
  const formState = useForm(
    {
      sourceId: data?.me?.paymentMethods[0]?.id,
    },
    [data?.me]
  )
  useIsAuth()

  if (loading) {
    return <Loader />
  }

  const renderStories = () => {
    if (!data?.me?.stories.length) return null

    return data.me.stories.map((story: Story) => {
      return (
        <li key={story.id} className={styles.story}>
          <Link href={`/stories/${story.id}`}>{story.title}</Link>
          {' | '}
          <Link href={`/stories/${story.id}/dashboard`}>
            Dashboard
          </Link>
        </li>
      )
    })
  }

  const renderNewStoryButton = () => {
    if (data?.me?.stories.length) {
      return (
        <>
          <p className={styles.ctaText}>Write a new story!</p>
          <Button
            onClick={() => push('/stories/new')}
            styleTypes={['cta']}
          >
            Start writing
          </Button>
        </>
      )
    }

    return (
      <>
        <p className={styles.ctaText}>Write your first story!</p>
        <Button
          onClick={() => push('/stories/new')}
          styleTypes={['cta']}
        >
          Start writing
        </Button>
      </>
    )
  }

  const handleBecomeAuthorClick = async (
    event: any,
    reset: Function,
    price: string
  ) => {
    event.preventDefault()
    await becomeAuthor({
      variables: { price, sourceId: formState.values.sourceId },
    })
  }

  const renderBecomeAuthorButton = () => {
    const options = data?.me?.paymentMethods.map(
      (paymentMethod: StripeSource) => ({
        value: paymentMethod.id,
        text: paymentMethod.name,
      })
    )
    return (
      <div className={styles.authorSubscription}>
        <h4>Unlock more as an Author!</h4>
        <ul>
          <li>Unlimited stories</li>
          <li>Something else</li>
          <li>Something else</li>
        </ul>
        <form className={styles.authorSubscriptionForm}>
          <Input
            type="select"
            name="sourceId"
            options={options}
            formState={formState}
          />
          <div className={styles.authorSubscriptionOptions}>
            <Button
              onClick={(event: any, reset: Function) =>
                handleBecomeAuthorClick(event, reset, 'month')
              }
            >
              $5/month
            </Button>
            <Button
              onClick={(event: any, reset: Function) =>
                handleBecomeAuthorClick(event, reset, 'year')
              }
            >
              $50/year
            </Button>
          </div>
        </form>
        <CreditCardForm />
      </div>
    )
  }

  const handleCancelAuthorshipClick = async () => {
    const confirm = window.confirm(
      'Are you sure you want to cancel your authorship? You will lose all of your benefits immediately.'
    )
    if (!confirm) return

    await cancelAuthorship()

    window.alert("We'll miss you!")
  }

  const cancelAuthorshipButton = () => {
    return (
      <div className={styles.authorSubscription}>
        <h4>Enjoy your benefits as an Author!</h4>
        <ul>
          <li>Unlimited stories</li>
          <li>Something else</li>
          <li>Something else</li>
        </ul>
        <a onClick={handleCancelAuthorshipClick}>Cancel Authorship</a>
      </div>
    )
  }

  const renderStatusCta = () => {
    switch (data?.me?.role) {
      case UserRole.Reader:
        return renderNewStoryButton()

      case UserRole.Writer:
        return renderBecomeAuthorButton()

      case UserRole.Author:
        return cancelAuthorshipButton()

      case UserRole.Admin:
        return <p>Aren't you special?</p>

      default:
        return (
          <p>
            This shouldn't be the case. Consider reporting this as a
            bug.
          </p>
        )
    }
  }

  return (
    <div>
      <h2>Writer's Dashboard</h2>

      <Card>
        <h3>My Stories</h3>
        <hr />
        <ul className={styles.stories}>{renderStories()}</ul>
        <hr />
        {renderNewStoryButton()}
      </Card>

      <Card>
        <h3>Status: {UserRole[data?.me?.role]}</h3>
        <hr />
        {renderStatusCta()}
      </Card>

      <Card>
        <h3>Stats</h3>
        <hr />
        <ul className={styles.stats}>
          <li className={styles.stat}>
            Followers:{' '}
            {
              data?.me?.subscribers.filter(
                (s: Subscription) => s.level === SubLevel.Free
              ).length
            }
          </li>
          {/* <li className={styles.stat}>
            Subscribers:{' '}
            {
              data?.me?.subscribers.filter(
                (s: Subscription) => s.level === SubLevel.Paid
              ).length
            }
          </li> */}
        </ul>
      </Card>
    </div>
  )
}

export default withApollo({ ssr: false })(WriterDashboard)
