import React, { FC } from 'react'
import { ActivityIndicator } from 'react-native'
import Layout from '../components/Layout'
import Text from '../components/Text'
import theme from '../theme'

interface Props {}

const Stories: FC<Props> = () => {
  return (
    <Layout>
      <Text h2>Stories</Text>
    </Layout>
  )
}

export default Stories
