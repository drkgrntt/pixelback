import styles from './New.module.scss'
import Card from '../../../components/Card'
import StoryForm from '../../../components/StoryForm'

const New: React.FC<{}> = () => {

  const save = async (formState: any) => {
    console.log('saving!', formState)
  }

  const handleSubmit = async (formState: any) => {
    await save(formState)
  }

  return (
    <div>
      <h2>New Story</h2>
      <Card>
        <StoryForm
          autoSave={save}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  )
}

export default New
