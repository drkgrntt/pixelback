import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { Story } from './Story'
import { PublishStatus } from '../types'
import { Rating } from './Rating'

@ObjectType()
@Entity()
export class Chapter extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  storyId: string

  @Field(() => Story)
  @ManyToOne(() => Story, (story) => story.chapters, {
    onDelete: 'CASCADE',
  })
  story: Story

  @Column('int')
  @Field(() => Int)
  number: number

  @Column()
  @Field()
  title: string

  @Column('text')
  @Field()
  body: string

  @Column('text')
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

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
