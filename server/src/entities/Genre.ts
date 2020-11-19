import { sanitize } from 'dompurify'
import { Field, ObjectType } from 'type-graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm'
import { StoryGenre } from './StoryGenre'

@Entity()
@ObjectType()
export class Genre extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column({ unique: true })
  name: string

  @OneToMany(() => StoryGenre, (storyGenre) => storyGenre.genre)
  storyGenre: StoryGenre

  @BeforeInsert()
  @BeforeUpdate()
  sanitizeInputs() {
    this.name = sanitize(this.name)
  }

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
