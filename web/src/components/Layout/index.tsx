import styles from './Layout.module.scss'
import Nav from './Nav'

const Layout: React.FC<{}> = (props) => {
  return (
    <>
      <Nav />
      <header>

      </header>
      <main className={styles.layout}>
        {props.children}
      </main>
      <footer>

      </footer>
    </>
  )
}

export default Layout