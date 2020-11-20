import styles from './Login.module.scss'
import LoginForm from '../../components/Login'
import Card from '../../components/Card'

const Login: React.FC<{}> = () => {
  return (
    <div className={styles.login}>
      <Card>
        <LoginForm />
      </Card>
    </div>
  )
}

export default Login
