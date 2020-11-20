import withApollo from '../utils/withApollo'
import Loader from '../components/Loader'

const Home: React.FC<{}> = () => {

  return (
    <div>
      <p>This is the home page</p>
      <Loader />
    </div>
  )
}

export default withApollo({ ssr: false })(Home)
