import {
  gql,
  useMutation,
  MutationHookOptions,
  DocumentNode,
} from '@apollo/client'
import { CommentInfo } from '@/fragments/CommentInfo'
import { storyQuery } from '@/queries/useStoryQuery'
import { chapterQuery } from '@/queries/useChapterQuery'

export const commentMutation = gql`
  mutation Comment(
    $body: String!
    $chapterId: String
    $storyId: String
  ) {
    comment(body: $body, chapterId: $chapterId, storyId: $storyId) {
      ...CommentInfo
    }
  }
  ${CommentInfo}
`

export const useCommentMutation = ({
  storyId,
  chapterId,
}: {
  storyId?: string
  chapterId?: string
}) => {
  const options: MutationHookOptions = {
    update: (cache, result) => {
      // Depending on if this is for a story or comment, update its cache
      let id: string, query: DocumentNode, field: string
      if (storyId) {
        id = storyId
        query = storyQuery
        field = 'story'
      } else {
        id = chapterId as string
        query = chapterQuery
        field = 'chapter'
      }

      const queryRes: any = cache.readQuery({
        query,
        variables: { id },
      })
      if (!queryRes) return
      cache.writeQuery({
        query,
        data: {
          __typename: 'Query',
          [field]: {
            ...queryRes[field],
            comments: [
              ...queryRes[field].comments,
              result.data.comment,
            ],
          },
        },
      })
    },
  }

  return useMutation(commentMutation, options)
}
