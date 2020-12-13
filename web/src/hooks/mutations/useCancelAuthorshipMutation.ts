import { gql, useMutation } from '@apollo/client'
import { UserInfo } from '@/fragments/UserInfo'

export const cancelAuthorshipMutation = gql`
  mutation CancelAuthorship {
    cancelAuthorship {
      ...UserInfo
    }
  }
  ${UserInfo}
`

export const useCancelAuthorshipMutation = () => {
  return useMutation(cancelAuthorshipMutation)
}
