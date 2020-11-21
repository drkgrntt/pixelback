import { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import userContext from '../../context/userContext'
import styles from './WriterDashboard.module.scss'
import Card from '../../components/Card'
import { SubLevel } from '../../types'
import Button from '../../components/Button'

const WriterDashboard: React.FC<{}> = () => {

  const { currentUser } = useContext(userContext)
  const { push } = useRouter()

  if (!currentUser) {
    return (
      <Card className={styles.login}>
        <Link href="/login">
          <a className={styles.login}>Login</a>
        </Link>
        {' '}to view your writer's dashboard.
      </Card>
    )
  }

  const renderStories = () => {

    if (!currentUser.stories.length) {
      return (
        <>
          <p className={styles.ctaText}>Write your first story!</p>
          <Button onClick={() => push('/stories/new')} styleTypes={['cta']}>Start writing</Button>
        </>
      )
    }

    return currentUser.stories.map((story) => {
      return (
        <li key={story.id} className={styles.story}>
          <Link href={`/stories/${story.id}`}>
            {story.title}
          </Link>
          {' | '}
          <Link href={`/stories/${story.id}/edit`}>
            Edit
          </Link>
        </li>
      )
    })
  }

  return (
    <div>
      <h2>Writer's Dashboard</h2>

      <Card>
        <h3>My Stories</h3>
        <ul className={styles.stories}>{renderStories()}</ul>
        <hr />
        <p className={styles.ctaText}>Write a new story!</p>
        <Button onClick={() => push('/stories/new')} styleTypes={['cta']}>Start writing</Button>
      </Card>

      <Card>
        <h3>Stats</h3>
        <hr />
        <ul className={styles.stats}>
          <li className={styles.stat}>
            Followers: {currentUser.subscribers.map(s => s.level === SubLevel.Free).length}
          </li>
          <li className={styles.stat}>
            Subscribers: {currentUser.subscribers.map(s => s.level === SubLevel.Free).length}
          </li>
        </ul>
      </Card>
    </div>
  )
}

export default WriterDashboard
