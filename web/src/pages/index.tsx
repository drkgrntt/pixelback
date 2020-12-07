import { NextPage } from 'next'
import { useRouter } from 'next/router'
import styles from './Home.module.scss'
import Button from '@/components/Button'

const Home: NextPage<{}> = () => {
  const { push } = useRouter()

  return (
    <div className={styles.home}>
      <div className={styles.cta}>
        <Button onClick={() => push('/stories')}>
          Start reading
        </Button>
        <em>or</em>
        <Button
          onClick={() => push('/register')}
          styleTypes={['cta']}
        >
          Create an account
        </Button>
      </div>
    </div>
  )
}

export default Home
