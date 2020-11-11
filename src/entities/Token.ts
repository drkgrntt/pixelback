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
    this.value = Token.unsign(this.value)
  }

  @AfterLoad()
  @AfterInsert()
  async addSignature() {
    this.value = Token.sign(this.value)
    if (!this.value) {
      await this.remove()
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

  static sign(value: string): string {
    const decoded = jwt.decode(`${value}.x`)
    if (decoded) {
      const signed = jwt.sign(decoded, process.env.JWT_SECRET)
      return signed
    }
    return ''
  }

  static unsign(value: string): string {
    const pieces = value.split('.')
    const unsigned = `${pieces[0]}.${pieces[1]}`
    return unsigned
  }

  static async verifyAndFindUser(value: string): Promise<User | null> {
    const unsigned = Token.unsign(value)
    const token = await Token.findOne({ value: unsigned }, { relations: ['user'] })
    if (!token) return null
    try {
      jwt.verify(value, process.env.JWT_SECRET)
      return token.user
    } catch (err) {
      await token.remove()
      return null
    }
  }
}
