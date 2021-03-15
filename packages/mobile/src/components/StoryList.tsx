import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { Story } from '@pixelback/shared'
import Text from './Text'
import Link from './Link'
import Card from './Card'

interface Props {
  stories: Story[]
}

const StoryList: FC<Props> = ({ stories }) => {
  const renderStories = () => {
    return stories.map((story: Story) => {
      return (
        <Card key={story.id} style={styles.card}>
          <Text style={styles.spaceUnder} h4>
            {story.title}
          </Text>
          <Link
            href="Author"
            params={{ id: story.author.id }}
            style={styles.spaceUnder}
          >
            {story.author.penName}
          </Link>
          <Text style={styles.spaceUnder}>{story.summary}</Text>
          <Text style={{ ...styles.italic, ...styles.spaceUnder }}>
            {story.genres.map((genre) => genre.name).join(', ')}
          </Text>
          <Link
            style={styles.read}
            params={{ storyId: story.id }}
            href="Story"
          >
            Read
          </Link>
        </Card>
      )
    })
  }

  return <>{renderStories()}</>
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  spaceUnder: {
    marginBottom: 5,
  },
  italic: {
    fontFamily: 'Raleway_400Regular_Italic',
  },
  read: {
    alignSelf: 'flex-end',
  },
})

export default StoryList
