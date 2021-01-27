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
import { Genre } from './Genre'

@Entity()
@Unique(['storyId', 'genreId'])
export class StoryGenre extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id!: string

  @PrimaryColumn()
  @Index()
  storyId: string

  @ManyToOne(() => Story, (story) => story.storyGenre, {
    onDelete: 'CASCADE',
  })
  story: Story

  @PrimaryColumn()
  @Index()
  genreId: string

  @ManyToOne(() => Genre, (genre) => genre.storyGenre, {
    onDelete: 'CASCADE',
  })
  genre: Genre

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
