import { Field, ObjectType } from 'type-graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  Index,
} from 'typeorm'
import { FavoriteGenre } from './FavoriteGenre'
import { StoryGenre } from './StoryGenre'

@Entity()
@ObjectType()
export class Genre extends BaseEntity {
  @Field()
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column({ unique: true })
  @Index()
  name: string

  @OneToMany(() => StoryGenre, (storyGenre) => storyGenre.genre)
  storyGenre: StoryGenre

  @OneToMany(
    () => FavoriteGenre,
    (favoriteGenre) => favoriteGenre.genre
  )
  favorited: FavoriteGenre[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
