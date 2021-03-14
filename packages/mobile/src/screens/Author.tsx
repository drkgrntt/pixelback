import React, { FC } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useUserQuery } from '@pixelback/shared'
import { RootStackParamList } from '../types'
import Layout from '../components/Layout'
import Title from '../components/Title'
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
    <Layout>
      <Title>{data.user.penName}</Title>
    </Layout>
  )
}

const styles = StyleSheet.create({})

export default Author
