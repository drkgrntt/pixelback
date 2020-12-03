import { NextPage } from 'next'
import styles from './Feedback.module.scss'
import { useForm } from '@/hooks/useForm'
import Card from '@/components/Card'
import Input from '@/components/Input'
import Button from '@/components/Button'

enum FeedbackType {
  general,
  bug,
  feature,
}

interface Props {}

const Feedback: NextPage<Props> = (props) => {
  const INITIAL_STATE = {
    type: FeedbackType.general,
    firstName: '',
    lastName: '',
    email: '',
    summary: '',
    details: '',
  }
  const formState = useForm(INITIAL_STATE)

  const handleSubmit = async (event: any, reset: Function) => {
    event.preventDefault()
    console.log(formState)
    setTimeout(() => reset(), 2000)
  }

  return (
    <div className={styles.feedback}>
      <h2>Feedback</h2>
      <Card>
        <form className={styles.form}>
          {/* <select name="type">
            <option value={FeedbackType.general}>General</option>
            <option value={FeedbackType.bug}>Bug Report</option>
            <option value={FeedbackType.feature}>
              Feature Request
            </option>
          </select> */}
          <Input
            required
            name="type"
            type="select"
            label="Feedback Type"
            options={[
              { value: FeedbackType.general, text: 'General' },
              { value: FeedbackType.bug, text: 'Bug Report' },
              {
                value: FeedbackType.feature,
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
            label="email Name"
            formState={formState}
          />
          <Input
            required
            type="textarea"
            name="summary"
            label="In one or sentenses, summarize your bug report or feature request."
            formState={formState}
          />
          <Input
            required
            type="textarea"
            name="details"
            label="Using as much detail as you would like (more makes it easier for us to take action), describe the bug or feature."
            formState={formState}
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </form>
      </Card>
    </div>
  )
}

export default Feedback
