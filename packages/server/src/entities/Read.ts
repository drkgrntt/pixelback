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
export class Read extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id!: string

  @Column({ nullable: true })
  @Index()
  readerId: string

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.reads, {
    onDelete: 'CASCADE',
  })
  reader: User

  @PrimaryColumn()
  @Index()
  storyId: string

  @Field(() => Story)
  @ManyToOne(() => Story, (story) => story.reads, {
    onDelete: 'CASCADE',
  })
  story: Story

  @Column({ nullable: true })
  @Index()
  chapterId: string

  @Field(() => Chapter, { nullable: true })
  @ManyToOne(() => Chapter, (chapter) => chapter.reads, {
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
