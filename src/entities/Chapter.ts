import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity
} from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import { Story } from './Story'

@ObjectType()
@Entity()
export class Chapter extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  storyId: string

  @ManyToOne(() => Story, (story) => story.chapters, {
    onDelete: "CASCADE"
  })
  story: Story

  @Column({ type: "int" })
  @Field()
  number: number

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
