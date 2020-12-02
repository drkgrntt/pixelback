import { NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Loader from '@/components/Loader'
import { useUserQuery } from '@/hooks/queries/useUserQuery'
import { withApollo } from '@/utils/withApollo'
import styles from './[userId].module.scss'

interface Props {
  query: ParsedUrlQuery
}

const UserPage: NextPage<Props> = ({ query }) => {
  const variables = { id: query?.userId }
  const skip = !query?.userId
  const { data, loading } = useUserQuery({ variables, skip })

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

UserPage.getInitialProps = ({ query }) => {
  return { query }
}

export default withApollo({ ssr: true })(UserPage as any)
