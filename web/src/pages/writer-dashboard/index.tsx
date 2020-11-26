import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './WriterDashboard.module.scss'
import Card from '@/components/Card'
import { Story, SubLevel, Subscription } from '@/types'
import Button from '@/components/Button'
import { useMeQuery } from '@/hooks/queries/useMeQuery'
import { useIsAuth } from '@/hooks/useIsAuth'
import Loader from '@/components/Loader'

const WriterDashboard: NextPage<{}> = () => {
  const { loading, data } = useMeQuery()
  const { push } = useRouter()
  useIsAuth()

  if (loading) {
    return <Loader />
  }

  const renderStories = () => {
    if (!data?.me.stories.length) return null

    return data?.me.stories.map((story: Story) => {
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
    if (data?.me.stories.length) {
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
        <h3>Stats</h3>
        <hr />
        <ul className={styles.stats}>
          <li className={styles.stat}>
            Followers:{' '}
            {
              data?.me.subscribers.map(
                (s: Subscription) => s.level === SubLevel.Free
              ).length
            }
          </li>
          <li className={styles.stat}>
            Subscribers:{' '}
            {
              data?.me.subscribers.map(
                (s: Subscription) => s.level === SubLevel.Free
              ).length
            }
          </li>
        </ul>
      </Card>
    </div>
  )
}

export default WriterDashboard
