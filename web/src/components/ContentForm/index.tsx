import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './ContentForm.module.scss'
import { useForm } from '@/hooks/useForm'
import Button from '../Button'
import Input from '../Input'
import { Content, PublishStatus } from '@/types'

interface Props {
  content?: Content
  autoSave?: Function
  onSubmit: Function
}

const ContentForm: React.FC<Props> = (props) => {
  const { content, autoSave, onSubmit } = props

  // Formstate handling
  const INITIAL_STATE = {
    id: content?.id || '',
    number: content?.number || 0,
    title: content?.title || '',
    summary: content?.summary || '',
    body: content?.body || '',
    publish: content?.status === PublishStatus.Published,
    enableCommenting: content?.enableCommenting || true,
    validation: '',
  }
  const formState = useForm(INITIAL_STATE)

  // Handle content update
  useEffect(() => {
    if (!formState.values.id && content) {
      formState.setValues({
        ...formState.values,
        id: content.id,
      })
      setInit(false)
    }
  }, [content])

  // Autosave handling
  const [saved, setSaved] = useState('')
  const [init, setInit] = useState(false)
  const [
    autoSaveTimer,
    setAutoSaveTimer,
  ] = useState<NodeJS.Timeout | null>(null)
  const [
    saveTextTimer,
    setSaveTextTimer,
  ] = useState<NodeJS.Timeout | null>(null)
  useEffect(() => {
    if (!autoSave || INITIAL_STATE.publish) return
    if (!init) {
      setInit(true)
      return
    }
    if (autoSaveTimer) clearTimeout(autoSaveTimer)
    if (formState.values.publish) return
    const saveTimer = setTimeout(async () => {
      if (formState.values.publish) return
      if (!formState.validate()) return
      setSaved('Saving...')
      await autoSave(formState)
      setSaved('Saved!')
      if (saveTextTimer) clearTimeout(saveTextTimer)
      const textTimer = setTimeout(() => {
        setSaved('')
        if (formState.values.validation) {
          formState.setValues({
            ...formState.values,
            validation: '',
          })
        }
      }, 8000)
      setSaveTextTimer(textTimer)
    }, 3000)
    setAutoSaveTimer(saveTimer)
    return () => {
      if (autoSaveTimer) clearTimeout(autoSaveTimer)
      if (saveTextTimer) clearTimeout(saveTextTimer)
    }
  }, [formState.values])

  // Submit handling
  const handleSubmit = async (event: any, reset: Function) => {
    event.preventDefault()

    if (!formState.validate()) {
      reset()
      return
    }
    try {
      await onSubmit(formState)
    } catch (error) {
      formState.setValues({
        ...formState.values,
        validation: error.message,
      })
    }
    reset()
  }

  const { route } = useRouter()
  const renderNumberInput = () => {
    if (!route.includes('chapter')) return

    return (
      <Input
        name="number"
        type="number"
        label="Chapter Number"
        formState={formState}
      />
    )
  }

  return (
    <form className={styles.form}>
      {renderNumberInput()}
      <Input name="title" label="Title" formState={formState} />
      <Input
        name="summary"
        type="textarea"
        label="Summary"
        formState={formState}
      />
      {510 - formState.values.summary.length} characters remaining
      <Input
        name="body"
        type="textarea"
        label="Body"
        formState={formState}
      />
      <Input
        name="enableCommenting"
        type="checkbox"
        label="Enable Commenting"
        formState={formState}
      />
      <Input
        name="publish"
        type="checkbox"
        label="Publish"
        formState={formState}
      />
      <span className={styles.saved}>{saved}</span>
      <span className={styles.validation}>
        {formState.values.validation}
      </span>
      <Button onClick={handleSubmit}>Submit</Button>
    </form>
  )
}

export default ContentForm
