import styles from './Login.module.scss'
import LoginForm from '../../components/Login'
import withApollo from '../../utils/withApollo'

const Login: React.FC<{}> = () => {
  return (
    <div className={styles.login}>
      <LoginForm />
    </div>
  )
}

export default withApollo({ ssr: false })(Login)
