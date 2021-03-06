import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMeQuery } from '@pixelback/shared'

export const useIsAuth = (skip?: boolean) => {
  const { data, loading } = useMeQuery({ skip })
  const router = useRouter()
  useEffect(() => {
    if (!skip && !loading && !data?.me) {
      router.replace(`/login?next=${router.pathname}`)
    }
  }, [loading, data, router, skip])
  return { loading }
}
