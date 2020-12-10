import { withApollo } from '@/utils/withApollo'
import { NextPage } from 'next'
import styles from './About.module.scss'

const About: NextPage<{}> = () => {
  return <div>This is the about page.</div>
}

export default withApollo({ ssr: false })(About)
