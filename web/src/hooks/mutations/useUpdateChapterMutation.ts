import { gql, useMutation } from '@apollo/client'
import { ChapterInfo } from '@/fragments/ChapterInfo.ts'

export const useUpdateChapterMutation = () => {
  const UPDATE_CHAPTER = gql`
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

  return useMutation(UPDATE_CHAPTER)
}
