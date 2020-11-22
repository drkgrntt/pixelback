import { Story } from '../../types'
import styles from './GenreList.module.scss'

interface Props {
  story: Story
}

const GenreList: React.FC<Props> = ({ story }) => {

  const renderGenres = () => {
    if (!story.genres.length) {
      return <p className={styles.ctaText}>This story has no genres. Start adding some!</p>
    }

    return story.genres.map(genre => {
      return (
        <li className={styles.genre} key={genre.id}>{genre.name}</li>
      )
    })
  }

  const renderGenreSearch = () => {
    return null
  }

  return (
    <>
      <h3>Genres</h3>
      <ul className={styles.genres}>{renderGenres()}</ul>
      <hr />
      {renderGenreSearch()}
    </>
  )
}

export default GenreList
