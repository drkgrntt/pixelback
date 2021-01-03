import styles from './Search.module.scss'
import Modal from '@/components/Modal'
import Input from '@/components/Input'
import StoryList from '@/components/StoryList'
import { useSearchStoriesQuery } from '@/queries/useSearchStoriesQuery'
import { useEffect, useState } from 'react'

interface Props {
  perPage: number
}

const Search: React.FC<Props> = (props) => {
  const [search, setSearch] = useState('')
  const [searchTerm, setSearchTerm] = useState(search)
  const storyInfo = useSearchStoriesQuery({
    variables: { take: props.perPage, search: searchTerm },
    skip: !searchTerm,
  })

  console.log(storyInfo)

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      setSearchTerm(search)
    }, 1000)
    return () => clearTimeout(searchTimeout)
  }, [search])

  const handleChange = (event: any) => {
    setSearch(event.target.value)
  }

  return (
    <Modal
      buttonStyleTypes={['tertiary']}
      className={styles.search}
      buttonText="Search"
    >
      <h2>Search by Author or Title</h2>
      <Input name="search" value={search} onChange={handleChange} />
      <StoryList
        showRating
        stories={storyInfo.data?.searchStories?.stories || []}
      />
    </Modal>
  )
}

export default Search
