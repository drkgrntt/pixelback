import { useRegisterMutation } from '../../hooks/useRegisterMutation'
import { useForm } from '../../hooks/useForm'
import Input from '../Input'
import Button from '../Button'

const Register: React.FC<{}> = ({}) => {

  const formState = useForm({ email: '', password: '' })
  const [register, data] = useRegisterMutation()

  // console.log(data)

  const handleSubmit = (event: any) => {
    event.preventDefault()

    if (formState.validate()) {
      return
    }

    try {
      register({ variables: formState.values })
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
