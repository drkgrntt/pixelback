import { gql, useMutation } from '@apollo/client'

export const updatePenNameMutation = gql`
  mutation UpdatePenName($penName: String!) {
    updatePenName(penName: $penName) {
      id
      penName
    }
  }
`

export const useUpdatePenNameMutation = () => {
  return useMutation(updatePenNameMutation)
}
