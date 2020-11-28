import { gql, useMutation } from '@apollo/client'

export const rateMutation = gql`
  mutation Rate($score: Int!, $storyId: String!, $chapterId: String) {
    rate(score: $score, storyId: $storyId, chapterId: $chapterId) {
      id
    }
  }
`

export const useRateMutation = () => {
  return useMutation(rateMutation)
}
