import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './WriterDashboard.module.scss'
import Card from '@/components/Card'
import { Story, SubLevel, Subscription, UserRole } from '@/types'
import Button from '@/components/Button'
import AuthorshipForm from '@/components/AuthorshipForm'
import { useMeQuery } from '@/queries/useMeQuery'
import { useIsAuth } from '@/hooks/useIsAuth'
import Loader from '@/components/Loader'
import { withApollo } from '@/utils/withApollo'
import { useCancelAuthorshipMutation } from '@/mutations/useCancelAuthorshipMutation'
import { useLinkAccountQuery } from '@/queries/useLinkAccountQuery'
import Modal from '@/components/Modal'
import CreditCardForm from '@/components/CreditCardForm'

const WriterDashboard: NextPage<{}> = () => {
  const { loading, data } = useMeQuery()
  const linkAccountData = useLinkAccountQuery({
    skip:
      !data?.me ||
      data?.me?.role < UserRole.Writer ||
      data?.me?.canAcceptPayments,
  })
  const { push } = useRouter()
  const [cancelAuthorship] = useCancelAuthorshipMutation()
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

  const renderLinkAccount = () => {
    if (!linkAccountData.data && linkAccountData.loading) {
      return <Loader />
    }

    if (!linkAccountData.data && data?.me?.canAcceptPayments) {
      return (
        <>
          <p>You are able to accept payments.</p>
          <a target="_blank" href="https://dashboard.stripe.com/">
            Stripe Home
          </a>
          <hr />
        </>
      )
    }

    if (
      !data?.me?.canAcceptPayments &&
      data?.me?.role > UserRole.Reader
    ) {
      return (
        <>
          <p>
            We use <a href="https://stripe.com/">Stripe</a> to handle
            tips to writers and authors.
          </p>
          <Button
            onClick={() =>
              (window.location.href =
                linkAccountData.data.linkAccount)
            }
          >
            Set your data
          </Button>
          <p>
            in order to start collecting tips. If you have already set
            your data, there may be additional steps on Stripe, so
            click the button again.
          </p>
          <hr />
        </>
      )
    }

    return
  }

  const renderBecomeAuthorButton = () => {
    return (
      <div className={styles.authorSubscription}>
        <h4>Unlock more as an Author!</h4>
        <ul>
          <li>Unlimited stories</li>
          <li>
            <em>All</em> future features
          </li>
        </ul>
        <AuthorshipForm />
        <Modal
          buttonText="Use a different card"
          className={styles.cardModal}
        >
          <h3>Add new card</h3>
          <CreditCardForm />
        </Modal>
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
          <li>
            <em>All</em> future features
          </li>
        </ul>
        <Modal
          buttonText="View plan details"
          className={styles.paymentDetails}
        >
          <h3>Plan Details</h3>
          <hr />
          <ul>
            <li>
              Plan: ${data?.me?.roleSubscription.price}/
              {data?.me?.roleSubscription.interval}
            </li>
            <li>
              Started:{' '}
              {data?.me?.roleSubscription.createdAt.toLocaleDateString()}
            </li>
            <li>
              Previous payment:{' '}
              {data?.me?.roleSubscription.currentPeriodStart.toLocaleDateString()}
            </li>
            <li>
              Next payment:{' '}
              {data?.me?.roleSubscription.currentPeriodEnd.toLocaleDateString()}
            </li>
          </ul>
          <a onClick={handleCancelAuthorshipClick}>
            Cancel Authorship
          </a>
        </Modal>
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
        {renderLinkAccount()}
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
