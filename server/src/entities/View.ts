import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import { User } from './User'
import { Story } from './Story'
import { Chapter } from './Chapter'

@ObjectType()
@Entity()
export class View extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ nullable: true })
  viewerId: string

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.views, {
    onDelete: 'CASCADE',
  })
  viewer: User

  @PrimaryColumn()
  storyId: string

  @Field(() => Story)
  @ManyToOne(() => Story, (story) => story.views, {
    onDelete: 'CASCADE',
  })
  story: Story

  @Column({ nullable: true })
  chapterId: string

  @Field(() => Chapter, { nullable: true })
  @ManyToOne(() => Chapter, (chapter) => chapter.views, {
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
