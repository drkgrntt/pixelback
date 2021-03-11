import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import Layout from '../components/Layout'
import Text from '../components/Text'

interface Props {}

const Feedback: FC<Props> = () => {
  return (
    <Layout>
      <Text h2>Feedback</Text>
    </Layout>
  )
}

export default Feedback
