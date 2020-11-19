import {
  Resolver,
  Mutation,
  Arg,
  UseMiddleware,
  Query,
} from 'type-graphql'
import { ILike } from 'typeorm'
import { Genre } from '../entities/Genre'
import { isAuth } from '../middleware/isAuth'

@Resolver(Genre)
export class GenreResolver {
  @Query(() => [Genre])
  async genres(
    @Arg('search', { nullable: true }) search: string
  ): Promise<Genre[]> {
    const query = { where: {} } as { where: { name: ReturnType<typeof ILike> } }
    if (search) {
      query.where.name = ILike(`%${search}%`)
    }
    const genres = await Genre.find(query)
    return genres
  }

  @Mutation(() => Genre)
  @UseMiddleware(isAuth)
  async createGenre(@Arg('name') name: string): Promise<Genre> {
    const genre = await Genre.create({ name }).save()
    return genre
  }
}
