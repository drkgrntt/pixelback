import React, { FC } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { useStoriesQuery } from '@pixelback/shared'
import Layout from '../components/Layout'
import Text from '../components/Text'
import theme from '../theme'
import StoryList from '../components/StoryList'

interface Props {}

const Stories: FC<Props> = () => {
  const { data, loading } = useStoriesQuery()

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
        <Text style={styles.spaceUnder} h2>
          Stories
        </Text>
        <StoryList stories={data.stories.stories} />
      </ScrollView>
    </Layout>
  )
}

const styles = StyleSheet.create({
  layout: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flex: 1,
    // backgroundColor: 'red',
  },
  container: {
    marginTop: 10,
    paddingLeft: 16,
    paddingRight: 16,
    // backgroundColor: 'blue',
  },
  spaceUnder: {
    marginBottom: 10,
  },
})

export default Stories
