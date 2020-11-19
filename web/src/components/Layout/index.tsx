import styles from './Layout.module.scss'
import Nav from './Nav'
import Header from './Header'

const Layout: React.FC<{}> = (props) => {
  return (
    <>
      <Nav />
      <Header />
      <main className={styles.layout}>
        {props.children}
      </main>
      <footer>

      </footer>
    </>
  )
}

export default Layout