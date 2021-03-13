import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Story } from '@pixelback/shared'
import Text from './Text'
import Card from './Card'
import Button from './Button'
import theme from '../theme'

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
          <TouchableOpacity
            onPress={() =>
              alert(`Redirect to ${story.author.penName}'s profile`)
            }
          >
            <Text style={styles.spaceUnder} a>
              {story.author.penName}
            </Text>
          </TouchableOpacity>
          <Text style={styles.spaceUnder}>{story.summary}</Text>
          {/* <Button
            onPress={() => {
              alert(`Redirect to ${story.title}`)
            }}
            containerStyle={styles.read}
          >
            Read
          </Button> */}
          <TouchableOpacity
            onPress={() => {
              alert(`Redirect to ${story.title}`)
            }}
            style={styles.read}
          >
            <Text a>Read</Text>
          </TouchableOpacity>
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
  read: {
    alignSelf: 'flex-end',
  },
})

export default StoryList
