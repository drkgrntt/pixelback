import { useState, useEffect, useContext } from 'react'
import styles from './StoryForm.module.scss'
import { useForm } from '../../hooks/useForm'
import Button from '../Button'
import Input from '../Input'
import { Story, PublishStatus } from '../../types'

interface Props {
  story?: Story
  autoSave?: Function
  onSubmit: Function
}

const StoryForm: React.FC<Props> = (props) => {
  const { story, autoSave, onSubmit } = props

  // Formstate handling
  const INITIAL_STATE = {
    id: story?.id || '',
    title: story?.title || '',
    summary: story?.summary || '',
    body: story?.body || '',
    publish: story?.status === PublishStatus.Published,
    enableCommenting: story?.enableCommenting || true,
    genres: story?.genres || [],
    validation: ''
  }
  const formState = useForm(INITIAL_STATE)

  // Handle story update
  useEffect(() => {
    if (!formState.values.id && story) {
      formState.setValues({
        ...formState.values,
        id: story.id
      })
      setInit(false)
    }
  }, [story])

  // Autosave handling
  const [saved, setSaved] = useState('')
  const [init, setInit] = useState(false)
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null)
  const [saveTextTimer, setSaveTextTimer] = useState<NodeJS.Timeout | null>(null)
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
      const textTimer = setTimeout(() => setSaved(''), 8000)
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
        validation: error.message
      })
    }
    reset()
  }

  return (
    <form className={styles.form}>
      <Input
        name="title"
        label="Title"
        formState={formState}
      />
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
        placeholder="Leave this blank if you are writing a chaptered story"
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
      <span className={styles.validation}>{formState.values.validation}</span>
      <Button onClick={handleSubmit}>Submit</Button>
    </form>
  )
}

export default StoryForm
