import { useLoginMutation } from '../../hooks/useLoginMutation'
import { useForm } from '../../hooks/useForm'
import Input from '../Input'

const Login: React.FC<{}> = ({}) => {

  const formState = useForm({ email: '', password: '' })
  const [login, data] = useLoginMutation()

  // console.log(data)

  const handleSubmit = (event: any) => {
    event.preventDefault()

    if (formState.validate()) {
      return
    }

    try {
      login({ variables: formState.values })
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
      <input type="submit" value="Login" />
    </form>
  )
}

export default Login
