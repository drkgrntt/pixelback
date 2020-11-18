import styles from '../styles/Home.module.scss'
import withApollo from '../utils/withApollo'
import Login from '../components/login'
import Register from '../components/register'

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
