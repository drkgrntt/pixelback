import styles from './Login.module.scss'
import { useContext } from 'react'
import userContext from '../../context/userContext'
import { useLoginMutation } from '../../hooks/useLoginMutation'
import { useForm } from '../../hooks/useForm'
import Input from '../Input'
import Button from '../Button'

const Login: React.FC<{}> = ({}) => {

  const { setCurrentUser } = useContext(userContext)
  const formState = useForm({ email: '', password: '' })
  const [login] = useLoginMutation()

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (formState.validate()) {
      return
    }

    try {
      const result = await login({ variables: formState.values })
      const { user, token } = result.data.login
      setCurrentUser(user, token.value)
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <Button type="submit">Login</Button>
    </form>
  )
}

export default Login
