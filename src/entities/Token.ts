import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BeforeInsert,
  AfterLoad,
  AfterInsert
} from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import jwt from 'jsonwebtoken'
import { User } from './User'

@ObjectType()
@Entity()
export class Token extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Field()
  @Column('text', { unique: true })
  value: string

  @BeforeInsert()
  removeSignature() {
    const pieces = this.value.split('.')
    this.value = `${pieces[0]}.${pieces[1]}`
  }

  @AfterLoad()
  @AfterInsert()
  addSignature() {
    const decoded = jwt.decode(this.value + '.x')
    if (decoded) {
      this.value = jwt.sign(decoded, process.env.JWT_SECRET)
    } else {
      this.remove()
    }
  }

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
