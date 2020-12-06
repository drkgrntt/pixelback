import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity,
  PrimaryColumn,
  Index,
} from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import { User } from './User'
import { Story } from './Story'
import { Chapter } from './Chapter'

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field()
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @PrimaryColumn()
  @Index()
  authorId: string

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.ratings, {
    onDelete: 'CASCADE',
  })
  author: User

  @Field()
  @Column('text')
  body: string

  @Column({ nullable: true })
  @Index()
  storyId: string

  @Field(() => Story, { nullable: true })
  @ManyToOne(() => Story, (story) => story.comments, {
    onDelete: 'CASCADE',
  })
  story: Story

  @Column({ nullable: true })
  @Index()
  chapterId: string

  @Field(() => Chapter, { nullable: true })
  @ManyToOne(() => Chapter, (chapter) => chapter.comments, {
    onDelete: 'CASCADE',
  })
  chapter: Chapter

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
