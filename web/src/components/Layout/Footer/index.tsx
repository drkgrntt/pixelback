import styles from './Footer.module.scss'

const Footer: React.FC<{}> = () => {
  return (
    <footer className={styles.footer}>
      <h2 className={styles.title}>Pixelback</h2>
      <span className={styles.copyright}>© drkgrntt 2020</span>
    </footer>
  )
}

export default Footer
