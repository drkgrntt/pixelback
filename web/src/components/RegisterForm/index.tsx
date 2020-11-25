import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './RegisterForm.module.scss'
import { useContext } from 'react'
import userContext from '@/context/userContext'
import { useRegisterMutation } from '@/mutations/useRegisterMutation'
import { useForm } from '@/hooks/useForm'
import Input from '../Input'
import Button from '../Button'

const RegisterForm: React.FC<{}> = ({}) => {
  const INITIAL_FORM_STATE = {
    email: '',
    password: '',
    validation: '',
  }

  const formState = useForm(INITIAL_FORM_STATE)
  const { setCurrentUser, setToken } = useContext(userContext)
  const { push } = useRouter()
  const [register] = useRegisterMutation()

  const handleSubmit = async (event: any, reset: Function) => {
    event.preventDefault()

    if (!formState.validate()) {
      reset()
      return
    }

    try {
      const result = await register({ variables: formState.values })
      const { user, token } = result.data.register
      setCurrentUser(user)
      setToken(token.value)
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
    <form className={styles.register}>
      <h2 className={styles.title}>Register</h2>
      <Input
        id="register-email"
        name="email"
        type="email"
        label="Email"
        formState={formState}
        required
      />
      <Input
        id="register-password"
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
        Register
      </Button>
      <Link href="login">
        <a className={styles.link}>Or login here!</a>
      </Link>
    </form>
  )
}

export default RegisterForm
