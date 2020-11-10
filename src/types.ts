import { Request, Response } from "express"
import { User } from './entities/User'

export enum UserRole {
  None,
  User,
  Author,
  Admin
}

export interface Context {
  req: Request
  res: Response
  me: User
};