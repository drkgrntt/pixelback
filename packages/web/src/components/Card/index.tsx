import styles from './Card.module.scss'

interface Props {
  className?: string
}

const Card: React.FC<Props> = (props) => {
  return (
    <div className={`${styles.card} ${props.className}`}>
      {props.children}
    </div>
  )
}

export default Card
