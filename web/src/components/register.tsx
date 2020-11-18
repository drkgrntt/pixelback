import { useRegisterMutation } from '../hooks/useRegisterMutation'
import { useForm } from '../hooks/useForm'
import Input from './input'

const Register: React.FC<{}> = ({}) => {

  const formState = useForm({ email: '', password: '' })
  const [register, data] = useRegisterMutation()

  console.log(data)

  const handleSubmit = (event: any) => {
    event.preventDefault()
    try {
      register({ variables: formState.values })
    } catch (error) {
      console.error(error)
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
      />
      <Input
        id="register-password"
        name="password"
        type="password"
        label="Password"
        formState={formState}
      />
      <input type="submit" value="Register" />
    </form>
  )
}

export default Register
