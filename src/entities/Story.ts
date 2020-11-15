import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { User } from './User'
import { Chapter } from './Chapter'
import { PublishStatus, RatingScore } from '../types'
import { Rating } from './Rating'

@ObjectType()
@Entity()
export class Story extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  authorId: string

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.stories, {
    onDelete: 'CASCADE',
  })
  author: User

  @Field(() => [Chapter])
  @OneToMany(() => Chapter, (chapter) => chapter.story)
  chapters: Chapter[]

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

  @Field(() => Int, { nullable: true })
  rateStatus: RatingScore | null

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
