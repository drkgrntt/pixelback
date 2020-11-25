import styles from './Layout.module.scss'
import Nav from './Nav'
import Header from './Header'
import Footer from './Footer'

const Layout: React.FC<{}> = (props) => {
  return (
    <>
      <Nav />
      <Header />
      <main className={styles.layout}>{props.children}</main>
      <Footer />
    </>
  )
}

export default Layout
