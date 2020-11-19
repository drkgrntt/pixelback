import styles from './Register.module.scss'
import { useContext } from 'react'
import userContext from '../../context/userContext'
import { useRegisterMutation } from '../../hooks/useRegisterMutation'
import { useForm } from '../../hooks/useForm'
import Input from '../Input'
import Button from '../Button'

const Register: React.FC<{}> = ({}) => {

  const { setCurrentUser } = useContext(userContext)
  const formState = useForm({ email: '', password: '' })
  const [register] = useRegisterMutation()

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (formState.validate()) {
      return
    }

    try {
      const result = await register({ variables: formState.values })
      const { user, token } = result.data.login
      setCurrentUser(user, token.value)
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <Button type="submit">Register</Button>
    </form>
  )
}

export default Register
