import { useState, useEffect } from 'react'
import {
  useAddGenreToStoryMutation,
  useCreateGenreMutation,
  useGenresQuery,
  Genre,
  Story,
} from '@pixelback/shared'
import Button from '../Button'
import Input from '../Input'
import styles from './GenreSearch.module.scss'

interface Props {
  story: Story
}

const GenreSearch: React.FC<Props> = ({ story }) => {
  const [search, setSearch] = useState('')
  const [genreId, setGenreId] = useState<string | null>(null)

  const [createGenre] = useCreateGenreMutation()
  const [addGenreToStory] = useAddGenreToStoryMutation()

  const searchResult = useGenresQuery({
    variables: { search },
    skip: !search,
  })
  useEffect(() => {
    const select = document.getElementById('genre-select')
    select?.dispatchEvent(new Event('mousedown'))
  }, [searchResult.data])

  const handleSubmit = async (event: any, reset: Function) => {
    event.preventDefault()

    const variables = {
      storyId: story.id,
      genreId: genreId,
    }

    if (genreId === 'newGenre') {
      try {
        const createResult = await createGenre({
          variables: { name: search },
        })
        variables.genreId = createResult.data.createGenre.id
      } catch (err) {
        console.warn(err)
        reset()
        return
      }
    }

    try {
      await addGenreToStory({ variables })
    } catch (err) {
      console.warn(err)
    }

    reset()
  }

  // useEffect(() => {
  //   if (!createdGenre.data) return
  //   const variables = {
  //     storyId: story.id,
  //     genreId: createdGenre.data.id
  //   }
  //   addGenreToStory({ variables })
  // }, [createdGenre])

  const getSearchResults = () => {
    if (searchResult.loading) return []

    if (!searchResult.data?.genres.length) {
      if (genreId !== 'newGenre') setGenreId('newGenre')
      return []
    }

    return searchResult.data.genres.map((genre: Genre) => {
      return { value: genre.id, text: genre.name }
    })
  }

  const getAddOption = () => {
    if (
      !search ||
      searchResult.data?.genres.find(
        (genre: Genre) =>
          genre.name.toLowerCase() === search.toLowerCase()
      )
    ) {
      return []
    }

    return [{ value: 'newGenre', text: `Add "${search}" as a genre` }]
  }

  return (
    <>
      <Input
        name="search"
        value={search}
        onChange={(event: any) => setSearch(event.target.value)}
      />
      <Input
        name="genre-select"
        type="select"
        value={genreId || undefined}
        onChange={(event: any) => setGenreId(event.target.value)}
        className={styles.select}
        disabled={!search}
        options={[
          { value: null, text: 'Select a genre' },
          ...getSearchResults(),
          ...getAddOption(),
        ]}
      />
      <Button onClick={handleSubmit}>Add Genre</Button>
    </>
  )
}

export default GenreSearch
