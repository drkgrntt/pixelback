import { MiddlewareFn } from 'type-graphql'
import { Context, UserRole } from '../types'

export const isAdmin: MiddlewareFn<Context> = ({ context }, next) => {
  if (context.me?.role !== UserRole.Admin) {
    throw new Error('Not admin')
  }

  return next()
}
