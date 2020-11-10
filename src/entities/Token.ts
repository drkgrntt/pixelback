import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import { User } from './User'

@ObjectType()
@Entity()
export class Token extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Field()
  @Column({ unique: true })
  value: string

  @Column()
  expiry: Date

  @Column()
  issued: Date

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.tokens)
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
