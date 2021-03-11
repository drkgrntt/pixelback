import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import Layout from '../components/Layout'
import Text from '../components/Text'

interface Props {}

const Stories: FC<Props> = () => {
  return (
    <Layout>
      <Text h2>Stories</Text>
    </Layout>
  )
}

export default Stories
