import styles from './Card.module.scss'

interface Props {

}

const Card: React.FC<Props> = (props) => {
  return (
    <div className={styles.card}>
      {props.children}
    </div>
  )
}

export default Card
