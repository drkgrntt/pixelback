import { useEffect, useState } from 'react'
import styles from './Header.module.scss'

const Header: React.FC<{}> = () => {
  const [isTop, setIsTop] = useState(true)
  useEffect(() => {
    const scrollListener = () => {
      if (isTop && window.scrollY >= 25) {
        setIsTop(false)
      } else if (!isTop && window.scrollY < 25) {
        setIsTop(true)
      }
    }
    document.addEventListener('scroll', scrollListener)
    return () =>
      document.removeEventListener('scroll', scrollListener)
  }, [isTop])

  return (
    <header className={`${styles.header} ${!isTop && styles.mini}`}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Pixelback
          <span className={styles.subtitle}>
            A platform for creative writers
          </span>
        </h1>
      </div>
    </header>
  )
}

export default Header
