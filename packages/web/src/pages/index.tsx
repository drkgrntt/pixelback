import { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import styles from './Home.module.scss'
import Button from '@/components/Button'
import { withApollo } from '@/utils/withApollo'
import Loader from '@/components/Loader'

const Home: NextPage<{}> = () => {
  const { push, replace } = useRouter()

  useEffect(() => {
    replace('/stories')
  }, [replace])

  return <Loader />

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

export default withApollo({ ssr: false })(Home)
