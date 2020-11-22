import { NextPage } from 'next'
import { useState } from 'react'
import styles from './Dashboard.module.scss'
import { useContext } from 'react'
import Error from 'next/error'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import Card from '../../../../components/Card'
import { useStoryQuery } from '../../../../hooks/useStoryQuery'
import { Genre, PublishStatus, Story } from '../../../../types'
import { useRouter } from 'next/router'
import userContext from '../../../../context/userContext'

const Dashboard: NextPage<{}> = () => {

  const { query, push } = useRouter()
  const [title, setTitle] = useState('')
  const { currentUser, setCurrentUser } = useContext(userContext)
  const result = useStoryQuery({ id: query.id as string })
  const story = result.data?.story

  if (!currentUser || !story) {
    return <Error statusCode={404} />
  }

  const onDeleteClick = (event: any, reset: Function) => {
    event.preventDefault()
    if (title !== story.title) {
      window.alert('The text in the input needs to match the title of the story exactly.')
      reset()
      return
    }

    const confirm = window.confirm(`Are you sure you want to permanently delete ${story.title}? Doing so will delete all chapters, comments, and ratings related to the story.`)
    if (confirm) {
      console.error('DELETING THE STORY')
      setCurrentUser({
        ...currentUser,
        stories: currentUser.stories.filter(s => s.id !== story.id)
      })
      push('/writer-dashboard')
    }

    reset()
  }

  return (
    <div>
      <h2>Story Dashboard</h2>

      <Card>
        <h3>Delete this story</h3>
        <p>In order to delete the story, please enter <strong>{story.title}</strong> into the input.</p>
        <Input
          name="title"
          value={title}
          onChange={(event: any) => setTitle(event.target.value)}
        />
        <Button
          styleTypes={['delete']}
          onClick={onDeleteClick}
        >
          Delete
        </Button>
      </Card>
    </div>
  )
}

export default Dashboard
