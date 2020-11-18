import Login from '../components/Login'
import Register from '../components/Register'
import withApollo from '../utils/withApollo'

const Home: React.FC = () => {

  return (
    <div>
      Kicking things off
      <Login />
      <Register />
    </div>
  )
}

export default withApollo({ ssr: false })(Home)
