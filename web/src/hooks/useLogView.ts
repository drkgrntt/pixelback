import { useEffect } from 'react'
import { useViewMutation } from '@/mutations/useViewMutation'

const READY_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_VIEW_TIMER as string) || 60 * 1000

export const useLogView = (storyId: string, chapterId?: string) => {
  const [view, result] = useViewMutation()
  useEffect(() => {
    if (!storyId) return
    const variables = { storyId, chapterId }
    const timeout = setTimeout(() => view({ variables }), READY_TIMEOUT)
    return () => clearTimeout(timeout)
  }, [storyId, chapterId])
  return result
}
