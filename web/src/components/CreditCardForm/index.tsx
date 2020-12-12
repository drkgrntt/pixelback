import { useState } from 'react'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { loadStripe, StripeCardElement } from '@stripe/stripe-js'
import styles from './CreditCardForm.module.scss'
import Loader from '../Loader'
import Button from '../Button'
import { useAddPaymentMethodMutation } from '@/hooks/mutations/useAddPaymentMethodMutation'

interface Props {
  onSuccess?: Function
  onError?: Function
}

const CreditCardForm: React.FC<Props> = ({
  onSuccess = () => {},
  onError = () => {},
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [validation, setValidation] = useState('')
  const [addPaymentMethod] = useAddPaymentMethodMutation()

  if (!elements || !stripe) {
    return <Loader />
  }

  const handleSubmit = async (event: any, reset: Function) => {
    event.preventDefault()

    const cardElement = elements.getElement(CardElement)
    const { error, paymentMethod } = await stripe.createPaymentMethod(
      {
        type: 'card',
        card: cardElement as StripeCardElement,
      }
    )

    if (error || !paymentMethod) {
      onError(error)
      setValidation(
        error?.message || 'Something went wrong. Try again later.'
      )
    } else {
      await addPaymentMethod({
        variables: { sourceId: paymentMethod?.id },
      })
      onSuccess(paymentMethod, setValidation)
      cardElement?.clear()
    }

    reset()
  }

  return (
    <form className={styles.form}>
      <CardElement
        className={styles.cardElement}
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <span className={styles.validation}>{validation}</span>
      <Button type="submit" disabled={!stripe} onClick={handleSubmit}>
        Add Card
      </Button>
    </form>
  )
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string
)

const StripeForm: React.FC<Props> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <CreditCardForm {...props} />
    </Elements>
  )
}

export default StripeForm
