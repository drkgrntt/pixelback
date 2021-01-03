import styles from './Footer.module.scss'

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <footer className={styles.footer}>
      <h2 className={styles.title}>Pixelback</h2>
      <p className={styles.comingSoon}>
        Coming soon on Android and iOS
      </p>
      <span className={styles.copyright}>© drkgrntt 2021</span>
    </footer>
  )
}

export default Footer
