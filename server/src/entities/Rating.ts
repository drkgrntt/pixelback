import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity,
  PrimaryColumn,
  Unique,
  Index,
} from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { RatingScore } from '../types'
import { User } from './User'
import { Story } from './Story'
import { Chapter } from './Chapter'

@ObjectType()
@Entity()
@Unique(['readerId', 'storyId', 'chapterId'])
export class Rating extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id!: string

  @PrimaryColumn()
  @Index()
  readerId: string

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.ratings, {
    onDelete: 'CASCADE',
  })
  reader: User

  @PrimaryColumn()
  @Index()
  storyId: string

  @Field(() => Story)
  @ManyToOne(() => Story, (story) => story.ratings, {
    onDelete: 'CASCADE',
  })
  story: Story

  @Column({ nullable: true })
  @Index()
  chapterId: string

  @Field(() => Chapter, { nullable: true })
  @ManyToOne(() => Chapter, (chapter) => chapter.ratings, {
    onDelete: 'CASCADE',
  })
  chapter: Chapter

  @Column('int')
  @Field(() => Int)
  score: RatingScore

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
