import { NextPage } from 'next'
import { useState } from 'react'
import styles from './Dashboard.module.scss'
import { useContext } from 'react'
import Error from 'next/error'
import DeleteStoryForm from '../../../../components/DeleteStoryForm'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import Card from '../../../../components/Card'
import { useStoryQuery } from '../../../../hooks/useStoryQuery'
import { Genre, PublishStatus, Story } from '../../../../types'
import { useRouter } from 'next/router'
import userContext from '../../../../context/userContext'

const Dashboard: NextPage<{}> = () => {

  const { query } = useRouter()
  const { currentUser } = useContext(userContext)
  const result = useStoryQuery({ id: query.id as string })
  const story = result.data?.story

  if (!currentUser || !story) {
    return <Error statusCode={404} />
  }

  return (
    <div>
      <h2>Story Dashboard</h2>

      <Card>
        <DeleteStoryForm story={story} />
      </Card>
    </div>
  )
}

export default Dashboard
