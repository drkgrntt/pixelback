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
  AfterInsert,
  Index,
} from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import jwt from 'jsonwebtoken'
import { User } from './User'

@ObjectType()
@Entity()
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id!: string

  @Field()
  @Column('text', { unique: true })
  @Index()
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
  @Index()
  expiry: Date

  @Column()
  issued: Date

  @Column()
  @Index()
  userId: string

  @ManyToOne(() => User, (user) => user.tokens, {
    onDelete: 'CASCADE',
  })
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

  static async verifyAndFindUser(
    value: string
  ): Promise<User | null> {
    const unsigned = Token.unsign(value)
    const token = await Token.findOne(
      { value: unsigned },
      { relations: ['user'] }
    )
    if (!token) return null
    try {
      jwt.verify(value, process.env.JWT_SECRET)
      return token.user
    } catch (err) {
      await token.remove()
      return null
    }
  }

  static async generate(
    uid: string,
    daysValid: number = 30
  ): Promise<Token> {
    const now = new Date()
    const expiry = new Date(
      new Date(now).setDate(now.getDate() + daysValid)
    )
    const value = jwt.sign(
      {
        uid: uid,
        iat: Math.floor(now.getTime() / 1000),
        exp: Math.floor(expiry.getTime() / 1000),
      },
      process.env.JWT_SECRET
    )

    const token = await Token.create({
      value,
      expiry,
      issued: now,
      userId: uid,
    }).save()

    return token
  }
}
