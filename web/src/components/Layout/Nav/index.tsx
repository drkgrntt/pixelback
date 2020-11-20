import Link from 'next/link'
import { useContext } from 'react'
import { useLogoutMutation } from '../../../hooks/useLogoutMutation'
import userContext from '../../../context/userContext'
import styles from './Nav.module.scss';

const Nav: React.FC<{}> = () => {

  const { currentUser, setCurrentUser } = useContext(userContext)
  const [logout] = useLogoutMutation()

  const toggleNav = () => {
    document.getElementById("nav-toggle")?.classList.toggle(styles.checked)
  }

  const onLogoutClick = async () => {
    toggleNav()
    try {
      await logout()
      setCurrentUser(null)
    } catch (err) {
      console.warn(err)
    }
  }

  const renderAuthLinks = () => {
    if (!currentUser) {
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
          {renderAuthLinks()}
        </div>
      </ul>
    </nav>
  )
}

export default Nav
