import { useState, useEffect } from 'react'
import styles from './Button.module.scss'

interface Props {
  className?: string
  disabled?: boolean
  onClick?: Function
  id?: string
  style?: { [key: string]: string }
  title?: string
  children: string
  type?: string
  styleTypes?: string[]
  submittedText?: string
}

const Button = (props: Props) => {

  const {
    // Standard button props
    className = '',
    disabled = false,
    onClick = () => {},
    id = null,
    style = {},
    title = '',
    children = '',
    type = '',

    // Custom button props
    styleTypes = ['primary'],
    submittedText = children
  } = props

  const [buttonDisabled, setButtonDisabled] = useState(disabled)
  const [buttonText, setButtonText] = useState(children)

  // Because use the state "buttonText" instead of children as the actual text,
  // we should update "buttonText" when "children" changes.
  useEffect(() => {
    setButtonText(children)
  }, [children])

  const handleClick = (event: any) => {

    setButtonText(submittedText)
    setButtonDisabled(true)

    const reset = () => {
      setButtonText(children)
      setButtonDisabled(false)
    }

    onClick(event, reset)
  }

  const classNames = [
    className,
    styles.button,
    ...styleTypes.map(styleType => styles[styleType])
  ].join(' ')

  if (type === 'submit') {
    return (
      <input
        className={classNames}
        disabled={buttonDisabled}
        id={id || undefined}
        title={title}
        style={style}
        type="submit"
        value={buttonText}
      />
    )
  }

  return (
    <button
      className={classNames}
      disabled={buttonDisabled}
      onClick={handleClick}
      id={id || undefined}
      title={title}
      style={style}
    >
      {buttonText}
    </button>
  )
}


export default Button