import { gql, QueryHookOptions, useQuery } from '@apollo/client'
import { ChapterInfo } from '@/fragments/ChapterInfo'

export const useChapterQuery = (options?: QueryHookOptions) => {
  const CHAPTER = gql`
    query Chapter($id: String!) {
      chapter(id: $id) {
        ...ChapterInfo
      }
    }
    ${ChapterInfo}
  `

  return useQuery(CHAPTER, options)
}
