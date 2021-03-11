import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { Story } from '@pixelback/shared'
import Text from './Text'
import Card from './Card'
import Button from './Button'

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
          <Text style={styles.spaceUnder} a>
            {story.author.penName}
          </Text>
          <Text style={styles.spaceUnder}>{story.summary}</Text>
          <Button onPress={() => {}}>Read</Button>
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
    marginBottom: 10,
  },
})

export default StoryList
