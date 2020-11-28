import Card from '../Card'
import styles from './StarScale.module.scss'

interface Props {
  score: number
}
/**
 * For each star:
 * 0-0.124 = empty |
 * 0.125-0.374 = quarter |
 * 0.375-0.624 = half |
 * 0.625-0.874 = three quarters |
 * 0.875-1 = full
 */
const StarScale: React.FC<Props> = ({ score }) => {
  const rem = score % 1
  const renderStar = (pos: number) => {
    // Full star
    if (pos <= score || (pos - 1 < score && rem >= 0.875)) {
      return (
        <i
          className={`${styles.star} fa fa-star`}
          aria-hidden="true"
        />
      )
      // Empty star
    } else if (pos - 1 > score || (pos > score && rem < 0.125)) {
      return (
        <i
          className={`${styles.star} ${styles.new} fa fa-star`}
          aria-hidden="true"
        />
      )
      // Star fractions
    } else {
      let phase = ''
      switch (true) {
        case rem >= 0.125 && rem < 0.375:
          phase = 'crescent'
          break
        case rem >= 0.625 && rem < 0.875:
          phase = 'gibbous'
          break
        default:
          phase = 'half'
          break
      }
      return (
        <div className={styles[phase]}>
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
