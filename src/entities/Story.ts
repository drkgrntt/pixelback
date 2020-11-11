import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import { User } from './User'
import { Chapter } from './Chapter'

@ObjectType()
@Entity()
export class Story extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  authorId: string

  @ManyToOne(() => User, (user) => user.stories, {
    onDelete: "CASCADE"
  })
  author: User

  @OneToMany(() => Chapter, (chapter) => chapter.story)
  chapters: Chapter[]

  @Column()
  @Field()
  title: string

  @Column("text")
  @Field()
  body: string

  @Column()
  @Field()
  enableCommenting: boolean

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
