import styles from './Layout.module.scss'
import Notification from './Notification'
import Nav from './Nav'
import Header from './Header'
import Footer from './Footer'

const Layout: React.FC<{}> = (props) => {
  return (
    <>
      {/* <Notification
        id="cookies"
        title="This site uses cookies."
        content="To learn more, read our <a href='/privacy-policy'>Privacy Policy</a>"
        type="session"
        closeText="I accept"
      /> */}
      <Nav />
      <Header />
      <main className={styles.layout}>{props.children}</main>
      <Footer />
    </>
  )
}

export default Layout
