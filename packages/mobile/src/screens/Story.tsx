import React, { FC } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native'
import StarRating from 'react-native-star-rating'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useStoryQuery } from '@pixelback/shared'
import { RootStackParamList } from '../types'
import Layout from '../components/Layout'
import Text from '../components/Text'
import Link from '../components/Link'
import theme from '../theme'
import { useLogRead } from '../util/useLogRead'

interface Props {}

const Author: FC<Props> = () => {
  const { params } = useRoute<
    RouteProp<RootStackParamList, 'Story'>
  >()
  const { loading, data, error } = useStoryQuery({
    variables: { id: params.storyId },
  })
  useLogRead(data?.story?.id)

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
      <ScrollView style={styles.container}>
        <Text h3 style={styles.spaceBelow}>
          {data.story.title}
        </Text>
        <Link
          style={styles.spaceBelow}
          href="Author"
          params={{ id: data.story.author.id }}
        >
          {data.story.author.penName}
        </Link>
        <Text style={styles.spaceBelow}>
          {data.story.reads} reads
        </Text>
        <Text style={styles.spaceBelow}>{data.story.body}</Text>
        <StarRating
          containerStyle={styles.stars}
          fullStarColor="#b8860b"
          disabled={false}
          maxStars={5}
          rating={data.story.score}
          // selectedStar={(rating) => alert(rating)}
        />
      </ScrollView>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  spaceBelow: {
    marginBottom: 8,
  },
  stars: {
    alignSelf: 'center',
    width: '60%',
    paddingBottom: 30,
  },
})

export default Author
