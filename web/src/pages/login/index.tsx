import { NextPage } from 'next'
import styles from './Login.module.scss'
import LoginForm from '@/components/LoginForm'
import Card from '@/components/Card'

const Login: NextPage<{}> = () => {
  return (
    <div className={styles.login}>
      <Card>
        <LoginForm />
      </Card>
    </div>
  )
}

export default Login
