import styles from './Search.module.scss'
import Modal from '@/components/Modal'
import Input from '@/components/Input'
import StoryList from '@/components/StoryList'
import { useSearchStoriesQuery } from '@pixelback/shared'
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
      <div className={styles.searchTitle}>
        <i aria-hidden className="fas fa-search"></i>
        <h3>Search by author, title, or genre</h3>
      </div>
      <Input
        // placeholder=""
        name="search"
        value={search}
        onChange={handleChange}
      />
      <StoryList
        showRating
        stories={storyInfo.data?.searchStories?.stories || []}
      />
    </Modal>
  )
}

export default Search
