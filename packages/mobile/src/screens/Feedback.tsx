import React, { FC, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import {
  FeedbackType,
  useGiveFeedbackMutation,
} from '@pixelback/shared'
import Layout from '../components/Layout'
import Text from '../components/Text'
import Input from '../components/Input'
import Button from '../components/Button'
import Title from '../components/Title'

interface Props {}

const INITIAL_STATE = {
  type: FeedbackType.General,
  firstName: 'Mobile',
  lastName: 'User',
  email: '',
  summary: '',
  details: '',
  validation: '',
}

const Feedback: FC<Props> = () => {
  const [state, setState] = useState(INITIAL_STATE)
  const [giveFeedback] = useGiveFeedbackMutation()

  const handleSubmit = async () => {
    setState({ ...state, validation: '' })
    Object.keys(state).forEach((key) => {
      if (
        key !== 'validation' &&
        state[key as keyof typeof state] === ''
      ) {
        setState({
          ...state,
          validation: 'Please fill out all of the fields',
        })
      }
    })

    if (state.validation) {
      return
    }

    try {
      const result = await giveFeedback({
        variables: {
          ...state,
          type: parseInt(state.type.toString()),
        },
      })
      if (result) {
        setState({
          ...INITIAL_STATE,
          validation: 'Thank you for your feedback!',
        })
      } else {
        setState({
          ...state,
          validation:
            'Something went wrong and we were not able to recieve your feedback. Please try again or come back later.',
        })
      }
    } catch {
      setState({
        ...state,
        validation: 'Something went wrong. Please try again later',
      })
    }
  }

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <Title>Feedback</Title>
        <Input
          value={state.type}
          onChange={(type) => setState({ ...state, type })}
          options={[
            { label: 'General', value: FeedbackType.General },
            { label: 'Bug Report', value: FeedbackType.Bug },
            { label: 'Feature Request', value: FeedbackType.Feature },
          ]}
          type="single-select"
          label="Feedback Type"
        />
        <Input
          label="Email Address"
          value={state.email}
          onChange={(email) => setState({ ...state, email })}
          textContentType="emailAddress"
          autoCompleteType="email"
          autoCapitalize="none"
        />
        <Input
          type="textarea"
          label="Summary"
          value={state.summary}
          onChange={(summary) => setState({ ...state, summary })}
        />
        <Input
          type="textarea"
          label="Details"
          value={state.details}
          onChange={(details) => setState({ ...state, details })}
        />
        <Text validation style={{ paddingBottom: 15 }}>
          {state.validation}
        </Text>
        <Button onPress={handleSubmit}>Submit</Button>
      </ScrollView>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    padding: 15,
    // width: '80%',
  },
  title: {
    paddingBottom: 10,
  },
})

export default Feedback
