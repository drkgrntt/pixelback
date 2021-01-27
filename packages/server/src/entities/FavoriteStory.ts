import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
  Unique,
  Index,
} from 'typeorm'
import { Story } from './Story'
import { User } from './User'

@Entity()
@Unique(['storyId', 'userId'])
export class FavoriteStory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id!: string

  @PrimaryColumn()
  @Index()
  storyId: string

  @ManyToOne(() => Story, (story) => story.favorited, {
    onDelete: 'CASCADE',
  })
  story: Story

  @PrimaryColumn()
  @Index()
  userId: string

  @ManyToOne(() => User, (user) => user.favoriteStories, {
    onDelete: 'CASCADE',
  })
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
