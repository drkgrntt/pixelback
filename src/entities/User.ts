import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { UserRole } from '../enums/UserRole'

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id!: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column()
  role: UserRole

  @Column()
  displayName: string
}
