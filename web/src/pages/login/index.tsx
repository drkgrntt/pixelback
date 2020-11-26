import { ParsedUrlQuery } from 'querystring'
import { NextPage } from 'next'
import styles from './Login.module.scss'
import LoginForm from '@/components/LoginForm'
import Card from '@/components/Card'

interface Props {
  query: ParsedUrlQuery
}

const Login: NextPage<Props> = ({ query }) => {
  return (
    <div className={styles.login}>
      <Card>
        <LoginForm next={query?.next as string || '/profile'} />
      </Card>
    </div>
  )
}

Login.getInitialProps = ({ query }) => {
  return { query }
}

export default Login
