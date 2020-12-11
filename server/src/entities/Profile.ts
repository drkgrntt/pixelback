import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Index,
  Column,
  OneToOne,
} from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import { User } from './User'

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id!: string

  @Field()
  @Column({ unique: true })
  @Index()
  userId: string

  @Field(() => User)
  @OneToOne(() => User, (user) => user.profile)
  user: User
}
