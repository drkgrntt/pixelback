import Link from 'next/link'
import { useMeQuery, useLogoutMutation } from '@pixelback/shared'
import styles from './Nav.module.scss'

const Nav: React.FC<{}> = () => {
  const [logout] = useLogoutMutation()
  const { data } = useMeQuery()

  const toggleNav = () => {
    document
      .getElementById('nav-toggle')
      ?.classList.toggle(styles.checked)
  }

  const onLogoutClick = async () => {
    toggleNav()
    try {
      await logout()
    } catch (err) {
      console.warn(err)
    }
  }

  const renderAuthLinks = () => {
    if (!data?.me) {
      return (
        <>
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
        </>
      )
    }

    return (
      <>
        <Link href="/profile">
          <li className={styles.item}>
            <a className={styles.link} onClick={toggleNav}>
              Profile
            </a>
          </li>
        </Link>
        <li className={styles.item}>
          <a className={styles.link} onClick={onLogoutClick}>
            Logout
          </a>
        </li>
      </>
    )
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <div className={styles.toggle} id="nav-toggle">
          <span
            className={`${styles.hamburger} ${styles.item}`}
            onClick={toggleNav}
          />
          <Link href="/stories">
            <li className={styles.item}>
              <a className={styles.link} onClick={toggleNav}>
                Stories
              </a>
            </li>
          </Link>
          {renderAuthLinks()}
          <Link href="/feedback">
            <li className={styles.item}>
              <a className={styles.link} onClick={toggleNav}>
                Feedback
              </a>
            </li>
          </Link>
        </div>
      </ul>
    </nav>
  )
}

export default Nav
