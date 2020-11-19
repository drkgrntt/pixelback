import Link from 'next/link'
import styles from './Nav.module.scss';

const Nav: React.FC<{}> = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <a className={styles.link}>
          <Link href="/">Home</Link>
        </a>
        <a className={styles.link}>
          <Link href="/about">About</Link>
        </a>
        <a className={styles.link}>
          <Link href="/register">Register</Link>
        </a>
        <a className={styles.link}>
          <Link href="/login">Login</Link>
        </a>
      </ul>
    </nav>
  )
}

export default Nav
