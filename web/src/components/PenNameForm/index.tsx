import { useForm } from '@/hooks/useForm'
import styles from './PenNameForm.module.scss'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useUpdatePenNameMutation } from '@/mutations/useUpdatePenNameMutation'

interface Props {
  onSuccess?: Function
}

const PenNameForm: React.FC<Props> = ({ onSuccess = () => {} }) => {
  const INITIAL_STATE = {
    penName: '',
    validation: '',
  }
  const formState = useForm(INITIAL_STATE)
  const [updatePenName] = useUpdatePenNameMutation()

  const handleSubmit = async (event: any, reset: Function) => {
    event.preventDefault()

    try {
      await updatePenName({ variables: formState.values })
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
        name="penName"
        label="Pen Name"
        type="text"
        formState={formState}
      />
      <span className={styles.validation}>
        {formState.values.validation}
      </span>
      <Button onClick={handleSubmit}>Submit</Button>
    </form>
  )
}

export default PenNameForm
