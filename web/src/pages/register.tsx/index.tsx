import styles from './Register.module.scss'
import RegisterForm from '../../components/Register'
import withApollo from '../../utils/withApollo'

const Register: React.FC<{}> = () => {
  return (
    <div className={styles.register}>
      <RegisterForm />
    </div>
  )
}

export default withApollo({ ssr: false })(Register)
