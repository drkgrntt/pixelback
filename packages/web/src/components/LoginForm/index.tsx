import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './LoginForm.module.scss'
import { useLoginMutation } from '@pixelback/shared'
import { useForm } from '@/hooks/useForm'
import Input from '../Input'
import Button from '../Button'
import Modal from '../Modal'
import ForgotPasswordForm from '../ForgotPasswordForm'

interface Props {
  next: string
  initialValidation?: string
}

const LoginForm: React.FC<Props> = ({
  next,
  initialValidation = '',
}) => {
  const INITIAL_FORM_STATE = {
    email: '',
    password: '',
    validation: initialValidation,
  }

  const formState = useForm(INITIAL_FORM_STATE)
  const { push } = useRouter()
  const [login] = useLoginMutation()

  const handleSubmit = async (event: any, reset: Function) => {
    event.preventDefault()

    if (!formState.validate()) {
      reset()
      return
    }

    try {
      await login({ variables: formState.values })
      formState.reset()
      push(next)
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
      <Button
        className={styles.submit}
        type="submit"
        onClick={handleSubmit}
      >
        Login
      </Button>
      <Modal
        buttonText="Forgot password?"
        buttonClassName={styles.forgotPassword}
      >
        <ForgotPasswordForm email={formState.values.email} />
      </Modal>
      <Link href="/register">
        <a className={styles.link}>Or create a new account!</a>
      </Link>
    </form>
  )
}

export default LoginForm
