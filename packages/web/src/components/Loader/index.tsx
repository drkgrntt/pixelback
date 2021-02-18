import Image from 'next/image'
import styles from './Loader.module.scss'

interface Props {
  width?: number
  height?: number
  className?: string
}

const Loader: React.FC<Props> = (props) => {
  const { width, height, className } = props
  return (
    <div className={`${styles.loader} ${className}`}>
      <Image
        src="/loader.svg"
        alt="Loader"
        width={width || 100}
        height={height || 100}
      />
    </div>
  )
}

export default Loader
