import { gql, MutationHookOptions, useMutation } from '@apollo/client'
import { ChapterInfo } from '../fragments/ChapterInfo'
import { storyQuery } from '../queries/useStoryQuery'
import { Story } from '../types'

export const createChapterMutation = gql`
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

export const useCreateChapterMutation = (storyId: string) => {
  const options: MutationHookOptions = {
    update: (cache, result) => {
      const storyRes = cache.readQuery<{ story: Story }>({
        query: storyQuery,
        variables: { id: storyId },
      })
      if (!storyRes) return
      cache.writeQuery({
        query: storyQuery,
        data: {
          __typename: 'Query',
          story: {
            ...storyRes.story,
            chapters: [
              ...storyRes.story.chapters,
              result.data.createChapter,
            ],
          },
        },
      })
    },
  }

  return useMutation(createChapterMutation, options)
}
