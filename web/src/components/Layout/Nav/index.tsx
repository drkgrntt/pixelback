import Link from 'next/link'
import styles from './Nav.module.scss';

const Nav: React.FC<{}> = () => {

  const toggleNav = () => {
    document.getElementById("nav-toggle")?.classList.toggle(styles.checked)
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <div className={styles.toggle} id="nav-toggle">
          <span className={`${styles.hamburger} ${styles.item}`} onClick={toggleNav} />
          <Link href="/">
            <li className={styles.item}>
              <a className={styles.link} onClick={toggleNav}>
                Home
              </a>
            </li>
          </Link>
          <Link href="/about">
            <li className={styles.item}>
              <a className={styles.link} onClick={toggleNav}>
                About
              </a>
            </li>
          </Link>
          <Link href="/register">
            <li className={styles.item}>
              <a className={styles.link} onClick={toggleNav}>
                Register
              </a>
            </li>
          </Link>
          <Link href="/login">
            <li className={styles.item}>
              <a className={styles.link} onClick={toggleNav}>
                Login
              </a>
            </li>
          </Link>
        </div>
      </ul>
    </nav>
  )
}

export default Nav
