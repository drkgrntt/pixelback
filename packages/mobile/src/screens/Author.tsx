import React, { FC } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useUserQuery } from '@pixelback/shared'
import { RootStackParamList } from '../types'
import Layout from '../components/Layout'
import Text from '../components/Text'
import StoryList from '../components/StoryList'
import theme from '../theme'

interface Props {}

const Author: FC<Props> = () => {
  const { params } = useRoute<
    RouteProp<RootStackParamList, 'Author'>
  >()
  const { loading, data, error } = useUserQuery({
    variables: { id: params.id },
  })

  if (!data || loading) {
    return (
      <Layout>
        <ActivityIndicator
          color={theme.colors.primary}
          size="large"
        />
      </Layout>
    )
  }

  return (
    <Layout style={styles.layout}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.spaceUnder} h3>
          {data.user.penName}
        </Text>
        <StoryList stories={data.user.stories} />
      </ScrollView>
    </Layout>
  )
}

const styles = StyleSheet.create({
  layout: {
    alignItems: 'stretch',
  },
  container: {
    marginTop: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  spaceUnder: {
    marginBottom: 10,
  },
})

export default Author
