import { gql, useMutation } from '@apollo/client'
import { ChapterInfo } from '../fragments/ChapterInfo'

export const updateChapterMutation = gql`
  mutation UpdateChapter(
    $id: String!
    $number: Float!
    $title: String!
    $summary: String!
    $body: String!
    $status: Float!
    $enableCommenting: Boolean!
  ) {
    updateChapter(
      id: $id
      number: $number
      title: $title
      summary: $summary
      body: $body
      status: $status
      enableCommenting: $enableCommenting
    ) {
      ...ChapterInfo
    }
  }
  ${ChapterInfo}
`

export const useUpdateChapterMutation = () => {
  return useMutation(updateChapterMutation)
}
