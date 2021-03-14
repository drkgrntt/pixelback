import React, { FC } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useStoryQuery } from '@pixelback/shared'
import { RootStackParamList } from '../types'
import Layout from '../components/Layout'
import Title from '../components/Title'
import theme from '../theme'

interface Props {}

const Author: FC<Props> = () => {
  const { params } = useRoute<
    RouteProp<RootStackParamList, 'Story'>
  >()
  const { loading, data, error } = useStoryQuery({
    variables: { id: params.storyId },
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
    <Layout>
      <Title>{data.story.title}</Title>
    </Layout>
  )
}

const styles = StyleSheet.create({})

export default Author
