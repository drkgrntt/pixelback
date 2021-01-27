import { useState, useEffect } from 'react'
import styles from './Modal.module.scss'
import Button from '../Button'

type StyleType =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'cta'
  | 'edit'
  | 'delete'
  | 'small'

interface Props {
  buttonClassName?: string
  buttonStyleTypes?: StyleType[]
  buttonId?: string
  buttonText: string
  className?: string
  closeId?: string
  onClose?: Function
  onOpen?: Function
}

const Modal: React.FC<Props> = (props) => {
  const {
    children,
    buttonClassName = '',
    buttonStyleTypes,
    buttonId,
    buttonText,
    className,
    closeId,
    onClose = () => {},
    onOpen = () => {},
  } = props
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    if (!closeId) return
    const close = () => {
      setHidden(true)
      onClose()
    }
    const closeButton = document.getElementById(closeId)
    closeButton?.addEventListener('click', close)
    return () => closeButton?.removeEventListener('click', close)
  }, [closeId])

  return (
    <>
      <Button
        className={buttonClassName}
        id={buttonId}
        styleTypes={buttonStyleTypes}
        onClick={(event: any, reset: Function) => {
          event.preventDefault()
          reset()
          setHidden(false)
          onOpen()
        }}
        style={
          buttonText
            ? { display: 'inline-block' }
            : { display: 'none' }
        }
      >
        {buttonText}
      </Button>

      <div
        className={`${styles.modal} ${hidden ? styles.hidden : ''}`}
        onClick={() => {
          setHidden(true)
          onClose()
        }}
      >
        <div
          className={styles.box}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            id={closeId}
            className={styles.close}
            onClick={(event) => {
              event.preventDefault()
              setHidden(true)
              onClose()
            }}
          >
            &#10005;
          </button>
          <div className={`${styles.content} ${className}`}>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
