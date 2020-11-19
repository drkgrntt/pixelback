import withApollo from '../utils/withApollo'

const Home: React.FC = () => {

  return (
    <div>
      This is the home page
    </div>
  )
}

export default withApollo({ ssr: false })(Home)
