import { NextPage } from 'next'
import styles from './Feedback.module.scss'
import { useForm } from '@/hooks/useForm'
import Card from '@/components/Card'
import Input from '@/components/Input'
import Button from '@/components/Button'
import {
  useGiveFeedbackMutation,
  FeedbackType,
} from '@pixelback/shared'
import { withApollo } from '@/utils/withApollo'

interface Props {}

const Feedback: NextPage<Props> = (props) => {
  const INITIAL_STATE = {
    type: FeedbackType.General,
    firstName: '',
    lastName: '',
    email: '',
    summary: '',
    details: '',
    validation: '',
  }
  const formState = useForm(INITIAL_STATE)
  const [giveFeedback] = useGiveFeedbackMutation()

  const handleSubmit = async (event: any, reset: Function) => {
    event.preventDefault()
    if (!formState.validate()) {
      formState.setValues({
        ...formState.values,
        validation: 'Please fill out the entire form.',
      })
      reset()
      return
    }
    try {
      const result = await giveFeedback({
        variables: {
          ...formState.values,
          type: parseInt(formState.values.type),
        },
      })
      if (result) {
        formState.setValues({
          ...INITIAL_STATE,
          validation: 'Thank you for your feedback!',
        })
      } else {
        formState.setValues({
          ...formState.values,
          validation:
            'Something went wrong and we were not able to recieve your feedback. Please try again or come back later.',
        })
      }
    } catch (err) {
      console.warn(err)
      formState.setValues({
        ...formState.values,
        validation: err.message,
      })
    }
    reset()
  }

  return (
    <div className={styles.feedback}>
      <h2>Feedback</h2>
      <Card>
        <form className={styles.form}>
          <Input
            required
            name="type"
            type="select"
            label="Feedback Type"
            options={[
              { value: FeedbackType.General, text: 'General' },
              { value: FeedbackType.Bug, text: 'Bug Report' },
              {
                value: FeedbackType.Feature,
                text: 'Feature Request',
              },
            ]}
            formState={formState}
          />
          <Input
            required
            name="firstName"
            label="First Name"
            formState={formState}
          />
          <Input
            required
            name="lastName"
            label="Last Name"
            formState={formState}
          />
          <Input
            required
            type="email"
            name="email"
            label="Email"
            formState={formState}
          />
          <Input
            required
            type="textarea"
            name="summary"
            label="In one or two sentenses, summarize your bug report or feature request."
            formState={formState}
          />
          <Input
            required
            type="textarea"
            name="details"
            label="Using as much detail as you would like (more makes it easier for us to take action), describe the bug or feature."
            formState={formState}
          />
          <span className={styles.validation}>
            {formState.values.validation}
          </span>
          <Button onClick={handleSubmit}>Submit</Button>
        </form>
      </Card>
    </div>
  )
}

export default withApollo({ ssr: false })(Feedback)
