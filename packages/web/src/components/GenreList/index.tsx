import styles from './GenreList.module.scss'
import GenreSearch from '../GenreSearch'
import Button from '../Button'
import {
  Genre,
  Story,
  useRemoveGenreFromStoryMutation,
} from '@pixelback/shared'

interface Props {
  story?: Story
}

const GenreList: React.FC<Props> = ({ story }) => {
  const [removeGenreFromStory] = useRemoveGenreFromStoryMutation()

  if (!story) return null

  const deleteGenre = async (
    genre: Genre,
    event: any,
    reset: Function
  ) => {
    event.preventDefault()
    const variables = {
      genreId: genre.id,
      storyId: story.id,
    }
    await removeGenreFromStory({ variables })
  }

  const renderGenres = () => {
    if (!story.genres.length) {
      return (
        <p className={styles.ctaText}>
          This story has no genres. Start adding some!
        </p>
      )
    }

    return story.genres.map((genre) => {
      return (
        <li key={genre.id} className={styles.genre}>
          <span className={styles.name}>{genre.name}</span>
          <Button
            styleTypes={['small', 'delete']}
            onClick={(event: any, reset: Function) =>
              deleteGenre(genre, event, reset)
            }
          >
            Remove
          </Button>
        </li>
      )
    })
  }

  return (
    <>
      <h3>Genres</h3>
      <ul className={styles.genres}>{renderGenres()}</ul>
      <hr />
      <GenreSearch story={story} />
    </>
  )
}

export default GenreList
