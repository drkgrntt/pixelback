import styles from './Register.module.scss'
import RegisterForm from '../../components/Register'
import Card from '../../components/Card'

const Register: React.FC<{}> = () => {
  return (
    <div className={styles.register}>
      <Card>
        <RegisterForm />
      </Card>
    </div>
  )
}

export default Register
