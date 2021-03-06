import { useEffect } from 'react'
import { useReadMutation } from '@pixelback/shared'

const READY_TIMEOUT = 60 * 1000

export const useLogRead = (storyId: string, chapterId?: string) => {
  const [read, result] = useReadMutation()
  useEffect(() => {
    if (!storyId) return
    const variables = { storyId, chapterId }
    const timeout = setTimeout(
      () => read({ variables }),
      READY_TIMEOUT
    )
    return () => clearTimeout(timeout)
  }, [storyId, chapterId])
  return result
}
