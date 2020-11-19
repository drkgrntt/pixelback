import styles from './Layout.module.scss'

const Layout: React.FC<{}> = (props) => {
  return (
    <>
      <nav>

      </nav>
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