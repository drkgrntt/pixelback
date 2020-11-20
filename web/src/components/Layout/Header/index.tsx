import styles from './Header.module.scss';

const Header: React.FC<{}> = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        Pixelback
        <span className={styles.subtitle}>A platform for writers</span>
      </h1>
    </header>
  )
}

export default Header
