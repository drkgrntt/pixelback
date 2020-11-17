import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity,
  Unique,
} from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { SubLevel } from '../types'
import { User } from './User'

@ObjectType()
@Entity()
@Unique(['subscriberId', 'subscribedToId'])
export class Subscription extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  subscriberId: string

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.subscriptions, {
    onDelete: 'CASCADE',
  })
  subscriber: User

  @Column()
  subscribedToId: string

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.subscribers, {
    onDelete: 'CASCADE',
  })
  subscribedTo: User

  @Column('int')
  @Field(() => Int)
  level: SubLevel

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
