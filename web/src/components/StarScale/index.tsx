import { useEffect, useState } from 'react'
import Card from '../Card'
import styles from './StarScale.module.scss'

interface Props {
  score: number
  onStarClick?: Function
  allowHover?: boolean
}
/**
 * For each star:
 * 0-0.124 = empty |
 * 0.125-0.374 = quarter |
 * 0.375-0.624 = half |
 * 0.625-0.874 = three quarters |
 * 0.875-1 = full
 */
const StarScale: React.FC<Props> = ({
  score,
  onStarClick = () => {},
  allowHover = false,
}) => {
  const [tmpScore, setTmpScore] = useState(score)
  useEffect(() => {
    setTmpScore(score)
  }, [score])

  useEffect(() => {
    if (!allowHover) return
    const onHover = (e: any) => {
      const classList: string[] = [...e.target.classList]
      const posClass = classList.find((className) =>
        className.includes('star-pos-')
      )
      if (!posClass) return
      const [_, __, pos] = posClass.split('-')
      setTmpScore(parseInt(pos))
    }
    const onBlur = () => {
      setTmpScore(score)
    }
    const stars = document.getElementsByClassName('fa-star')
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i]
      star.addEventListener('mouseover', onHover)
      star.addEventListener('mouseout', onBlur)
    }
    return () => {
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]
        star.removeEventListener('mouseover', onHover)
        star.removeEventListener('mouseout', onBlur)
      }
    }
  // Because of how we use masking to show a star fraction,
  // elements are creating and destroying when tmpScore changes
  // So we need to re-init events when tmpscore changes.
  // Seems heavy, so if there's a better way, I should change this.
  }, [tmpScore, allowHover])

  const rem = tmpScore % 1
  const renderStar = (pos: number) => {
    // Full star
    if (pos <= tmpScore || (pos - 1 < tmpScore && rem >= 0.875)) {
      return (
        <i
          onClick={() => onStarClick(pos)}
          className={`${allowHover && styles.hoverable} ${
            styles.star
          } fa fa-star star-pos-${pos}`}
          aria-hidden="true"
        />
      )
      // Empty star
    } else if (
      pos - 1 > tmpScore ||
      (pos > tmpScore && rem < 0.125)
    ) {
      return (
        <i
          onClick={() => onStarClick(pos)}
          className={`${allowHover && styles.hoverable} ${
            styles.star
          } ${styles.new} fa fa-star star-pos-${pos}`}
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
            onClick={() => onStarClick(pos)}
            className={`${allowHover && styles.hoverable} ${
              styles.star
            } fa fa-star star-pos-${pos}`}
            aria-hidden="true"
          />
          <i
            onClick={() => onStarClick(pos)}
            className={`${allowHover && styles.hoverable} ${
              styles.star
            } ${styles.mask} fa fa-star star-pos-${pos}`}
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
