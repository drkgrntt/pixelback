import styles from './PasswordResetForm.module.scss'
import { useForm } from '@/hooks/useForm'
import Input from '../Input'
import Button from '../Button'
import { useResetPasswordMutation } from '@/hooks/mutations/useResetPasswordMutation'

interface Props {
  onSuccess?: Function
}

const PasswordResetForm: React.FC<Props> = ({
  onSuccess = () => {},
}) => {
  const INITIAL_STATE = {
    current: '',
    new: '',
    verify: '',
    validation: '',
  }
  const formState = useForm(INITIAL_STATE)
  const [resetPassword] = useResetPasswordMutation()

  const handleSubmit = async (event: any, reset: Function) => {
    event.preventDefault()
    if (!formState.validate()) {
      formState.setValues({
        ...formState.values,
        validation: 'Something is still wrong.',
      })
      reset()
      return
    }

    if (formState.values.new !== formState.values.verify) {
      formState.setValues({
        ...formState.values,
        validation: 'The new passwords do not match.',
      })
      reset()
      return
    }

    try {
      const variables = {
        oldPassword: formState.values.current,
        newPassword: formState.values.new,
      }
      await resetPassword({ variables })
    } catch (err) {
      console.warn(err)
      formState.setValues({
        ...formState.values,
        validation: err.message,
      })
      reset()
      return
    }

    formState.reset()
    reset()
    onSuccess()
  }

  return (
    <form className={styles.form}>
      <Input
        required
        name="current"
        label="Current Password"
        type="password"
        formState={formState}
      />
      <Input
        required
        name="new"
        label="New Password"
        type="password"
        formState={formState}
      />
      <Input
        required
        name="verify"
        label="Verify New Password"
        type="password"
        formState={formState}
      />
      <span className={styles.validation}>
        {formState.values.validation}
      </span>
      <Button onClick={handleSubmit}>Submit</Button>
    </form>
  )
}

export default PasswordResetForm
