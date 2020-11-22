import { NextPage } from 'next'
import Loader from '@/components/Loader'

const Home: NextPage<{}> = () => {

  return (
    <div>
      <p>This is the home page</p>
      <Loader />
    </div>
  )
}

export default Home
