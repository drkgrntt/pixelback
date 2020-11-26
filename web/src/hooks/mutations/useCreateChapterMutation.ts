import { ApolloCache, gql, MutationHookOptions, useMutation } from '@apollo/client'
import { ChapterInfo } from '@/fragments/ChapterInfo.ts'

export const useCreateChapterMutation = () => {
  const CREATE_CHAPTER = gql`
    mutation CreateChapter(
      $storyId: String!
      $number: Float!
      $title: String!
      $summary: String!
      $body: String!
      $status: Float!
      $enableCommenting: Boolean!
    ) {
      createChapter(
        storyId: $storyId
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

  return useMutation(CREATE_CHAPTER)
}
