import { gql, QueryHookOptions, useQuery } from '@apollo/client'
import { ChapterInfo } from '@/fragments/ChapterInfo'

export const chapterQuery = gql`
  query Chapter($id: String!) {
    chapter(id: $id) {
      ...ChapterInfo
    }
  }
  ${ChapterInfo}
`

export const useChapterQuery = (options?: QueryHookOptions) => {
  return useQuery(chapterQuery, options)
}
