import { NextPage } from 'next'
import styles from './Register.module.scss'
import RegisterForm from '@/components/RegisterForm'
import Card from '@/components/Card'
import { withApollo } from '@/utils/withApollo'

const Register: NextPage<{}> = () => {
  return (
    <div className={styles.register}>
      <Card>
        <RegisterForm />
      </Card>
    </div>
  )
}

export default withApollo({ ssr: false })(Register)
