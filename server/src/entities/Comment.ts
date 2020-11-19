import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity,
  PrimaryColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import { sanitize } from 'dompurify'
import { User } from './User'
import { Story } from './Story'
import { Chapter } from './Chapter'

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @PrimaryColumn()
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
  storyId: string

  @Field(() => Story, { nullable: true })
  @ManyToOne(() => Story, (story) => story.comments, {
    onDelete: 'CASCADE',
  })
  story: Story

  @Column({ nullable: true })
  chapterId: string

  @Field(() => Chapter, { nullable: true })
  @ManyToOne(() => Chapter, (chapter) => chapter.comments, {
    onDelete: 'CASCADE',
  })
  chapter: Chapter

  @BeforeInsert()
  @BeforeUpdate()
  sanitizeInputs() {
    this.body = sanitize(this.body)
  }

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
