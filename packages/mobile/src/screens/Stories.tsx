import React, { FC } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { useStoriesQuery } from '@pixelback/shared'
import Layout from '../components/Layout'
import Title from '../components/Title'
import theme from '../theme'
import StoryList from '../components/StoryList'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

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
        <TouchableWithoutFeedback
          onLongPress={async () => {
            const env = await AsyncStorage.getItem(
              '@pixelback.environment'
            )
            if (env === 'prod') {
              await AsyncStorage.setItem(
                '@pixelback.environment',
                'stage'
              )
              alert(
                'Setting the environment to stage. Please reset the app to see the changes.'
              )
            } else {
              await AsyncStorage.setItem(
                '@pixelback.environment',
                'prod'
              )
              alert(
                'Setting the environment to prod. Please reset the app to see the changes.'
              )
            }
          }}
        >
          <Title>Stories</Title>
        </TouchableWithoutFeedback>
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
})

export default Stories
