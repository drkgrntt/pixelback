import styles from '../styles/Home.module.scss'
import withApollo from '../utils/withApollo'
import Login from '../components/login'

const Home: React.FC = () => {

  return (
    <div>
      Kicking things off
      <Login />
    </div>
  )
}

export default withApollo({ ssr: false })(Home)
