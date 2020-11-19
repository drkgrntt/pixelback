import { Field, ObjectType } from 'type-graphql'
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
@ObjectType()
export class Genre extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column({ unique: true })
  name: string

  @OneToMany(() => StoryGenre, (storyGenre) => storyGenre.genre)
  storyGenre: StoryGenre

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
