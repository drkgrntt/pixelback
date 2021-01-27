import { useState, useEffect } from 'react'
import styles from './ForgotPasswordForm.module.scss'
import Input from '../Input'
import Button from '../Button'
import { useForgotPasswordMutation } from '@/hooks/mutations/useForgotPasswordMutation'

interface Props {
  email: string
}

const ForgotPasswordForm: React.FC<Props> = (props) => {
  const [forgotPassword] = useForgotPasswordMutation()
  const [email, setEmail] = useState(props.email || '')
  const [validation, setValidation] = useState('')
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (!editing && props.email && email !== props.email) {
      setEmail(props.email)
    }
  })

  const handleSubmit = async (event: any, reset: Function) => {
    event.preventDefault()
    try {
      const result = await forgotPassword({ variables: { email } })
      if (result.data) {
        setValidation('Your email is on its way!')
      } else {
        setValidation(
          'Something went wrong sending the email. Please try again later.'
        )
      }
    } catch (error) {
      setValidation(error.message)
    }
    reset()
  }

  return (
    <div className={styles.form}>
      <h3>Forgot your password?</h3>

      <p>
        Nothing to worry about! Just enter your email in the field
        below, and we'll send you a link so you can reset it.
      </p>

      <Input
        id="email_forgot_password"
        label="Email"
        name="email"
        value={email}
        onChange={(event: any) => setEmail(event.target.value)}
        onFocus={() => {
          if (!editing) setEditing(true)
        }}
        onBlur={() => {
          if (editing) setEditing(false)
        }}
      />

      <p className={styles.validation}>{validation}</p>

      <Button type="submit" onClick={handleSubmit}>
        Send
      </Button>
    </div>
  )
}

export default ForgotPasswordForm
