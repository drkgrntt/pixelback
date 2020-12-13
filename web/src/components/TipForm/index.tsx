import styles from './TipForm.module.scss'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useForm } from '@/hooks/useForm'
import { useMeQuery } from '@/queries/useMeQuery'
import { StripeSource, User } from '@/types'

interface Props {
  author: User
}

const TipForm: React.FC<Props> = ({ author }) => {
  const { data } = useMeQuery()
  const INITIAL_STATE = {
    amount: 1.0,
    authorId: author.id,
    sourceId: data?.me?.paymentMethods[0]?.id,
  }
  const formState = useForm(INITIAL_STATE, [data?.me])

  if (!data?.me) return null

  const options = data.me.paymentMethods.map(
    (paymentMethod: StripeSource) => ({
      value: paymentMethod.id,
      text: paymentMethod.name,
    })
  )

  const tipText = `Tip $${formState.values.amount}`

  return (
    <form className={styles.form}>
      <Input
        type="select"
        name="sourceId"
        options={options}
        formState={formState}
      />
      <Input
        type="number"
        name="amount"
        step={0.01}
        min={1}
        formState={formState}
      />
      <Button>{tipText}</Button>
    </form>
  )
}

export default TipForm
