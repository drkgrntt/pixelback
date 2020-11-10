import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import { UserRole } from '../enums/UserRole'

@ObjectType()
@Entity()
export class User extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Field()
  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Field()
  @Column()
  role: UserRole

  @Field()
  @Column()
  displayName: string
}
