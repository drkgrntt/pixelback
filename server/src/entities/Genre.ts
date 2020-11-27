import { Field, ObjectType } from 'type-graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm'
import { FavoriteGenre } from './FavoriteGenre'
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

  @OneToMany(() => FavoriteGenre, (favoriteGenre) => favoriteGenre.genre)
  favorited: FavoriteGenre[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
