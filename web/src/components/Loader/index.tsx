import Image from 'next/image'
import styles from './Loader.module.scss'

const Loader: React.FC<{}> = () => {
  return (
    <div className={styles.loader}>
      <Image src="/loader.svg" alt="Loader" width={100} height={100} />
    </div>
  )
}

export default Loader
