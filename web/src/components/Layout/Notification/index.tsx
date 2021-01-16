import { useState, useEffect } from 'react'
import styles from './Notification.module.scss'
import Button from '@/components/Button'

interface Props {
  id: string
  title: string
  content: string
  type?: 'session' | 'local'
  closeText?: string
}

const Notification: React.FC<Props> = (props) => {
  const [hidden, setHidden] = useState(true)
  const [storage, setStorage] = useState<Storage | null>(null)
  const [closedNotifications, setClosedNotifications] = useState<
    string[]
  >([])

  useEffect(() => {
    switch (props.type) {
      case 'session':
        setStorage(sessionStorage)
        break

      case 'local':
      default:
        setStorage(localStorage)
        break
    }
  }, [])

  useEffect(() => {
    if (!storage) return

    let localClosedNotificationsJson = storage?.getItem(
      'closedNotifications'
    )

    let localClosedNotifications
    if (!localClosedNotificationsJson) {
      storage?.setItem('closedNotifications', JSON.stringify([]))
      localClosedNotifications = []
    } else {
      localClosedNotifications = JSON.parse(
        localClosedNotificationsJson
      )
      setClosedNotifications(localClosedNotifications)
    }

    if (!localClosedNotifications.includes(props.id)) {
      setHidden(false)
    }
  }, [storage])

  const closeNotification = () => {
    const newClosedNotifications = [...closedNotifications, props.id]
    setHidden(true)
    setClosedNotifications(newClosedNotifications)
    storage?.setItem(
      'closedNotifications',
      JSON.stringify(newClosedNotifications)
    )
  }

  const renderClose = () => {
    if (props.closeText) {
      return (
        <Button onClick={closeNotification}>{props.closeText}</Button>
      )
    }

    return (
      <button className={styles.close} onClick={closeNotification}>
        &#10005;
      </button>
    )
  }

  return (
    <div
      className={`${styles.notification} ${
        hidden ? styles.hidden : ''
      }`}
    >
      <div className={styles.content}>
        <h4 className={styles.title}>{props.title}</h4>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
      {renderClose()}
    </div>
  )
}

export default Notification
