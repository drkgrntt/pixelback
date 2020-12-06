import Head from 'next/head'

interface Props {
  title?: string
  titleContent?: string
  image?: string
  description?: string
  keywords?: string
  children?: any
}

const PageHead: React.FC<Props> = (props) => {
  const { title, image, description, keywords, children } = props

  const titleTags = () => {
    if (!title) return
    return (
      <>
        <title>{title}</title>
        <meta key="title" name="title" content={title} />
        <meta key="og-title" property="og:title" content={title} />
        <meta
          key="og-site-name"
          property="og:site_name"
          content={title}
        />
        <meta
          key="twitter-title"
          property="twitter:title"
          content={title}
        />
      </>
    )
  }

  const descriptionTags = () => {
    if (!description) return
    return (
      <>
        <meta
          key="twitter-description"
          property="twitter:description"
          content={description}
        />
        <meta
          key="description"
          name="description"
          content={description}
        />
        <meta
          key="og-description"
          property="og:description"
          content={description}
        />
      </>
    )
  }

  const imageTags = () => {
    if (!image) return
    return (
      <>
        <meta key="og-image" property="og:image" content={image} />
        <meta key="og-url" property="og:url" content={image} />
        <meta
          key="og-image-type"
          property="og:image:type"
          content="image/jpeg"
        />
        <meta
          key="og-image-width"
          property="og:image:width"
          content="200"
        />
        <meta
          key="og-image-height"
          property="og:image:height"
          content="200"
        />
      </>
    )
  }

  const keywordsTags = () => {
    if (!keywords) return
    return (
      <>
        <meta key="keywords" name="keywords" content={keywords} />
      </>
    )
  }

  return (
    <Head>
      {titleTags()}

      {descriptionTags()}

      {imageTags()}

      {keywordsTags()}

      {children}
    </Head>
  )
}

export default PageHead
