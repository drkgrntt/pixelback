import Input from '@/components/Input'
import Button from '@/components/Button'
import { useForm } from '@/hooks/useForm'
import {
  StripeSource,
  useBecomeAuthorMutation,
  useMeQuery,
} from '@pixelback/shared'
import styles from './AuthorshipForm.module.scss'

interface Props {}

const AuthorshipForm: React.FC<Props> = (props) => {
  const { data } = useMeQuery()
  const [becomeAuthor] = useBecomeAuthorMutation()
  const formState = useForm(
    {
      sourceId: data?.me?.paymentMethods[0]?.id,
    },
    [data?.me]
  )

  const handleBecomeAuthorClick = async (
    event: any,
    reset: Function,
    price: string
  ) => {
    event.preventDefault()
    await becomeAuthor({
      variables: { price, sourceId: formState.values.sourceId },
    })
  }

  const options = data?.me?.paymentMethods.map(
    (paymentMethod: StripeSource) => ({
      value: paymentMethod.id,
      text: paymentMethod.name,
    })
  )

  return (
    <div className={styles.authorshipForm}>
      <form className={styles.form}>
        <Input
          type="select"
          name="sourceId"
          options={options}
          formState={formState}
        />
        <div className={styles.options}>
          <Button
            onClick={(event: any, reset: Function) =>
              handleBecomeAuthorClick(event, reset, 'month')
            }
          >
            $4/month
          </Button>
          <Button
            onClick={(event: any, reset: Function) =>
              handleBecomeAuthorClick(event, reset, 'year')
            }
          >
            $40/year
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AuthorshipForm
