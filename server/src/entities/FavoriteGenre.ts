import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
  Unique,
} from 'typeorm'
import { Genre } from './Genre'
import { User } from './User'

@Entity()
@Unique(['genreId', 'userId'])
export class FavoriteGenre extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @PrimaryColumn()
  genreId: string

  @ManyToOne(() => Genre, (genre) => genre.favorited, {
    onDelete: "CASCADE"
  })
  genre: Genre

  @PrimaryColumn()
  userId: string

  @ManyToOne(() => User, (user) => user.favoriteStories, {
    onDelete: "CASCADE"
  })
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
