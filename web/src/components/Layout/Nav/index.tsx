import Link from 'next/link'
import { useLogoutMutation } from '@/mutations/useLogoutMutation'
import styles from './Nav.module.scss'
import { useMeQuery } from '@/hooks/queries/useMeQuery'

const Nav: React.FC<{}> = () => {
  const [logout] = useLogoutMutation()
  const { refetch, data } = useMeQuery()

  const toggleNav = () => {
    document
      .getElementById('nav-toggle')
      ?.classList.toggle(styles.checked)
  }

  const onLogoutClick = async () => {
    toggleNav()
    try {
      await logout()
      refetch()
      localStorage.removeItem('token')
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
