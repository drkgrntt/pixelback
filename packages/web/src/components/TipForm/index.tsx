import { useRouter } from 'next/router'
import { PaymentMethod } from '@stripe/stripe-js'
import styles from './TipForm.module.scss'
import Input from '@/components/Input'
import Button from '@/components/Button'
import CreditCardForm from '@/components/CreditCardForm'
import { useForm } from '@/hooks/useForm'
import {
  StripeSource,
  User,
  useMeQuery,
  useTipAuthorMutation,
} from '@pixelback/shared'

interface Props {
  author: User
}

const TipForm: React.FC<Props> = ({ author }) => {
  const { data } = useMeQuery()
  const { asPath } = useRouter()
  const [tipAuthor] = useTipAuthorMutation()
  const INITIAL_STATE = {
    amount: 1.0,
    authorId: author.id,
    sourceId: data?.me?.paymentMethods[0]?.id,
    validation: '',
  }
  const formState = useForm(INITIAL_STATE, [data?.me])

  if (!author.canAcceptPayments) {
    return null
  }

  const options = data?.me?.paymentMethods.map(
    (paymentMethod: StripeSource) => ({
      value: paymentMethod.id,
      text: paymentMethod.name,
    })
  )

  const tipText = `Tip $${formState.values.amount}`

  const handleTipClick = async (event: any, reset: Function) => {
    event.preventDefault()
    formState.values.amount = parseInt(formState.values.amount)
    await tip()
    reset()
  }

  const tip = async () => {
    try {
      await tipAuthor({ variables: formState.values })
      formState.setValues({
        ...formState.values,
        validation: 'Thank you for your tip!',
      })
    } catch (err) {
      formState.setValues({
        ...formState.values,
        validation: 'Something went wrong.',
      })
    }
  }

  // Logged out
  if (!data?.me) {
    return (
      <>
        <Input
          label="Amount"
          type="number"
          name="amount"
          step={0.01}
          min={1}
          formState={formState}
        />
        <CreditCardForm
          onSuccess={async (paymentMethod: PaymentMethod) => {
            formState.values.amount = parseInt(
              formState.values.amount
            )
            formState.values.sourceId = paymentMethod.id
            await tip()
          }}
          addToUser={false}
          submitText={tipText}
        />
        <span className={styles.validation}>
          {formState.values.validation}
        </span>
      </>
    )
  }

  // Logged in
  return (
    <>
      <form className={styles.form}>
        <Input
          label="Card"
          type="select"
          name="sourceId"
          options={options}
          formState={formState}
        />
        <Input
          label="Amount"
          type="number"
          name="amount"
          step={0.01}
          min={1}
          formState={formState}
        />
        <Button onClick={handleTipClick}>{tipText}</Button>
        <span className={styles.validation}>
          {formState.values.validation}
        </span>
      </form>
      <p>Need a different card?</p>
      <CreditCardForm />
    </>
  )
}

export default TipForm
