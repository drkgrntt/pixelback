import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMeQuery } from '@/queries/useMeQuery'

export const useIsAuth = (skip?: boolean) => {
  const { data, loading, refetch } = useMeQuery({ skip })
  const router = useRouter()
  useEffect(() => {
    if (!skip && !loading && !data?.me) {
      router.replace('/login?next=' + router.pathname)
    }
  }, [loading, data, router, skip])
  return { loading, refetch }
}
