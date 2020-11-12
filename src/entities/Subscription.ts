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
import { SubLevel } from '../types'
import { User } from './User'

@ObjectType()
@Entity()
export class Subscription extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  subscriberId: string

  @ManyToOne(() => User, (user) => user.subscriptions)
  subscriber: User

  @Column()
  subscribedToId: string

  @ManyToOne(() => User, (user) => user.subscribers)
  subscribedTo: User

  @Column()
  @Field()
  level: SubLevel

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
