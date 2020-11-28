import Card from '../Card'
import styles from './StarScale.module.scss'

interface Props {
  score: number
}

const StarScale: React.FC<Props> = ({ score }) => {
  const renderStar = (pos: number) => {
    if (pos-.25 < score) {
      return (
        <i
          className={`${styles.star} fa fa-star`}
          aria-hidden="true"
        />
      )
    } else if (pos > score && pos-1 < score && pos-score > .25 && pos-score < .75) {
      return (
        <div className={styles.half}>
          <i
            className={`${styles.star} fa fa-star`}
            aria-hidden="true"
          />
          <i
            className={`${styles.star} ${styles.mask} fa fa-star`}
            aria-hidden="true"
          />
        </div>
      )
    } else {
      return (
        <i
          className={`${styles.star} ${styles.empty} fa fa-star`}
          aria-hidden="true"
        />
      )
    }
  }

  return (
    <Card className={styles.starScale}>
      <div className={styles.stars}>
        {renderStar(1)}
        {renderStar(2)}
        {renderStar(3)}
        {renderStar(4)}
        {renderStar(5)}
      </div>
    </Card>
  )
}

export default StarScale
