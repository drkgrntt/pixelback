import styles from './Footer.module.scss'
import Link from 'next/link'

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <footer className={styles.footer}>
      <h2 className={styles.title}>Pixelback</h2>
      {/* <p className={styles.comingSoon}>
        Coming soon on Android and iOS
      </p> */}
      <span className={styles.copyright}>
        © drkgrntt {new Date().getFullYear()}
      </span>
      {/* <ul className={styles.links}>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/terms-of-use">
            <a>Terms</a>
          </Link>
        </li>
        <li>
          <Link href="/privacy-policy">
            <a>Privacy</a>
          </Link>
        </li>
        <li>
          <Link href="/cookie-policy">
            <a>Cookies</a>
          </Link>
        </li>
      </ul> */}
    </footer>
  )
}

export default Footer
