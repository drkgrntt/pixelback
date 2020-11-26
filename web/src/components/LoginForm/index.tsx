import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './LoginForm.module.scss'
import { useLoginMutation } from '@/mutations/useLoginMutation'
import { useForm } from '@/hooks/useForm'
import Input from '../Input'
import Button from '../Button'
import { useMeQuery, meQuery } from '@/hooks/queries/useMeQuery'

const LoginForm: React.FC<{}> = ({}) => {
  const INITIAL_FORM_STATE = {
    email: '',
    password: '',
    validation: '',
  }

  const formState = useForm(INITIAL_FORM_STATE)
  const { push } = useRouter()
  const [login] = useLoginMutation()
  // const { refetch } = useMeQuery()

  const handleSubmit = async (event: any, reset: Function) => {
    event.preventDefault()

    if (!formState.validate()) {
      reset()
      return
    }

    try {
      await login({ variables: formState.values})
      formState.reset()
      push('/profile')
    } catch (error) {
      console.warn(error)
      formState.setValues({
        ...formState.values,
        validation: error.message,
      })
    }
    reset()
  }

  return (
    <form className={styles.login}>
      <h2 className={styles.title}>Login</h2>
      <Input
        id="login-email"
        name="email"
        type="email"
        label="Email"
        formState={formState}
        required
      />
      <Input
        id="login-password"
        name="password"
        type="password"
        label="Password"
        formState={formState}
        required
      />
      <span className={styles.validation}>
        {formState.values.validation}
      </span>
      <Button type="submit" onClick={handleSubmit}>
        Login
      </Button>
      <Link href="/register">
        <a className={styles.link}>Or create a new account!</a>
      </Link>
    </form>
  )
}

export default LoginForm
