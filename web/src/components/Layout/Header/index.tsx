import styles from './Header.module.scss'

const Header: React.FC<{}> = () => {
  return (
    <header className={styles.header}>
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
