import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Unique,
} from 'typeorm'
import { ObjectType, Field, Int, Float } from 'type-graphql'
import { Story } from './Story'
import { Comment } from './Comment'
import { PublishStatus, RatingScore } from '../types'
import { Rating } from './Rating'
import { Read } from './Read'
import { User } from './User'

@ObjectType()
@Entity()
@Unique(['storyId', 'number'])
export class Chapter extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  authorId: string

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.chapters, {
    onDelete: 'CASCADE'
  })
  author: User

  @Column()
  storyId: string

  @Field(() => Story)
  @ManyToOne(() => Story, (story) => story.chapters, {
    onDelete: 'CASCADE',
  })
  story: Story

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.chapter)
  comments: Comment[]

  @Column('int')
  @Field(() => Int)
  number: number

  @Column()
  @Field()
  title: string

  @Column('text')
  @Field()
  body: string

  @Column({ length: 510 })
  @Field()
  summary: string

  @Column()
  @Field()
  enableCommenting: boolean

  @Column('int')
  @Field(() => Int)
  status: PublishStatus

  @Field(() => [Rating])
  @OneToMany(() => Rating, (rating) => rating.story)
  ratings: Rating[]

  @Field(() => Int, { nullable: true })
  rateStatus: RatingScore | null

  @OneToMany(() => Read, (read) => read.chapter)
  reads: Read[]

  @Field(() => Float)
  score: number

  @Field(() => Chapter, { nullable: true })
  previous: Chapter

  @Field(() => Chapter, { nullable: true })
  next: Chapter

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  publishedAt: Date

  @BeforeInsert()
  @BeforeUpdate()
  setPublishedAt() {
    if (
      !this.publishedAt &&
      this.status === PublishStatus.Published
    ) {
      this.publishedAt = new Date()
    }
  }

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
