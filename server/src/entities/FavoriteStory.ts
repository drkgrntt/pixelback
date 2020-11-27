import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
  Unique,
} from 'typeorm'
import { Story } from './Story'
import { User } from './User'

@Entity()
@Unique(['storyId', 'userId'])
export class FavoriteStory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @PrimaryColumn()
  storyId: string

  @ManyToOne(() => Story, (story) => story.favorited, {
    onDelete: "CASCADE"
  })
  story: Story

  @PrimaryColumn()
  userId: string

  @ManyToOne(() => User, (user) => user.favoriteStories, {
    onDelete: "CASCADE"
  })
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
