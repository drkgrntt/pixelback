import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm'
import { StoryGenre } from './StoryGenre'

@Entity()
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  name: string

  @OneToMany(() => StoryGenre, (storyGenre) => storyGenre.genre)
  storyGenre: StoryGenre

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
