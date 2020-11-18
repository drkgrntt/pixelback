import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import styles from '../styles/Home.module.scss'
import withApollo from '../utils/withApollo'
import Input from '../components/input'

const Home: React.FC = () => {

  const LOGIN = gql`
    mutation Login($email: String! $password: String!) {
      login(
        email: $email
        password: $password
      ) {
        user {
          id
          email
          displayName
          role
        }
        token {
          value
        }
      }
    }
  `
  const [login, data] = useMutation(LOGIN)
  const [state, setState] = useState({ email: '', password: '' })

  console.log(data)

  return (
    <div>
      Kicking things off
      <Input
        name="email"
        label="Email"
        value={state.email}
        onChange={(event: any) => setState({ ...state, email: event.target.value })}
      />
      <Input
        name="password"
        type="password"
        label="Password"
        value={state.password}
        onChange={(event: any) => setState({ ...state, password: event.target.value })}
      />
      <button onClick={() => login({ variables: state }).catch(err => console.error(err))}>Login</button>
    </div>
  )
}

export default withApollo({ ssr: false })(Home)
