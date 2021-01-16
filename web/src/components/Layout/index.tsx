import styles from './Layout.module.scss'
import Notification from './Notification'
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
      <Notification
        id="cookies"
        title="This site uses cookies."
        content="To learn more, read our <a href='/private-policy'>Private Policy</a>"
        type="session"
        closeText="I accept"
      />
    </>
  )
}

export default Layout
