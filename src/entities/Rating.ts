import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity
} from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { RatingScore } from '../types'
import { User } from './User'
import { Story } from './Story'
import { Chapter } from './Chapter'

@ObjectType()
@Entity()
export class Rating extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  readerId: string

  @ManyToOne(() => User, (user) => user.ratings)
  reader: User

  @Column()
  storyId: string

  @ManyToOne(() => Story, (story) => story.ratings, {
    onDelete: "CASCADE"
  })
  story: Story

  @Column()
  chapterId: string

  @ManyToOne(() => Chapter, (chapter) => chapter.ratings, {
    onDelete: "CASCADE"
  })
  chapter: Chapter

  @Column("int")
  @Field(() => Int)
  score: RatingScore

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
