import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from './DeleteChapterForm.module.scss'
import { useDeleteChapterMutation } from '@/mutations/useDeleteChapterMutation'
import Input from '../Input'
import Button from '../Button'
import { Story, Chapter } from '@/types'

interface Props {
  chapter: Chapter
  story: Story
}

const DeleteChapterForm: React.FC<Props> = ({ story, chapter }) => {
  const [title, setTitle] = useState('')
  const [deleteChapter] = useDeleteChapterMutation()
  const { push } = useRouter()

  const onDeleteClick = async (event: any, reset: Function) => {
    event.preventDefault()
    if (title !== chapter.title) {
      window.alert(
        'The text in the input needs to match the title of the chapter exactly.'
      )
      reset()
      return
    }

    const confirm = window.confirm(
      `Are you sure you want to permanently delete ${chapter.title}? Doing so will delete all chapters, comments, and ratings related to the chapter.`
    )
    if (confirm) {
      await deleteChapter({ variables: { id: chapter.id } })
      push('/writer-dashboard')
    }

    reset()
  }

  return (
    <form className={styles.form}>
      <h3>Delete this chapter</h3>
      <p>
        In order to delete the chapter, please enter{' '}
        <strong>{chapter.title}</strong> into the input.
      </p>
      <Input
        name="title"
        value={title}
        onChange={(event: any) => setTitle(event.target.value)}
      />
      <Button
        type="submit"
        styleTypes={['delete']}
        onClick={onDeleteClick}
      >
        Delete
      </Button>
    </form>
  )
}

export default DeleteChapterForm
