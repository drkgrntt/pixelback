import Image from 'next/image'
import styles from './Loader.module.scss'

interface Props {
  width?: number
  height?: number
}

const Loader: React.FC<Props> = (props) => {
  const { width, height } = props
  return (
    <div className={styles.loader}>
      <Image src="/loader.svg" alt="Loader" width={width || 100} height={height || 100} />
    </div>
  )
}

export default Loader
