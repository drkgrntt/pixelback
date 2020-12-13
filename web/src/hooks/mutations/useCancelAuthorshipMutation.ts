import { gql, useMutation } from '@apollo/client'
import { UserInfo } from '@/fragments/UserInfo'

export const cancelAuthorshipMutation = gql`
  mutation CancelAuthorship {
    cancelAuthorship {
      ...UserInfo
      roleSubscription {
        id
        createdAt
        currentPeriodStart
        currentPeriodEnd
        daysUntilDue
      }
    }
  }
  ${UserInfo}
`

export const useCancelAuthorshipMutation = () => {
  return useMutation(cancelAuthorshipMutation)
}
