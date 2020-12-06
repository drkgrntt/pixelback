import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
  Unique,
  Index,
} from 'typeorm'
import { Genre } from './Genre'
import { User } from './User'

@Entity()
@Unique(['genreId', 'userId'])
export class FavoriteGenre extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id!: string

  @PrimaryColumn()
  @Index()
  genreId: string

  @ManyToOne(() => Genre, (genre) => genre.favorited, {
    onDelete: 'CASCADE',
  })
  genre: Genre

  @PrimaryColumn()
  @Index()
  userId: string

  @ManyToOne(() => User, (user) => user.favoriteStories, {
    onDelete: 'CASCADE',
  })
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
