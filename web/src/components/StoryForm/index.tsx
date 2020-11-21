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
    title: story?.title || '',
    summary: story?.summary || '',
    body: story?.body || '',
    publish: story?.status === PublishStatus.Published,
    validation: ''
  }
  const formState = useForm(INITIAL_STATE)

  // Autosave handling
  const [saved, setSaved] = useState('')
  const [init, setInit] = useState(false)
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null)
  useEffect(() => {
    if (!autoSave || INITIAL_STATE.publish) return
    if (!init) {
      setInit(true)
      return
    }
    if (autoSaveTimer) clearTimeout(autoSaveTimer)
    if (formState.values.publish) return
    const timer = setTimeout(async () => {
      if (formState.values.publish) return
      setSaved('Saving...')
      await autoSave(formState)
      setSaved('Saved!')
      setTimeout(() => setSaved(''), 10000)
    }, 3000)
    setAutoSaveTimer(timer)
    return () => {
      if (autoSaveTimer) clearTimeout(autoSaveTimer)
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
      <Input
        name="body"
        type="textarea"
        label="Body"
        formState={formState}
        placeholder="Leave this blank if you are writing a chaptered story"
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
