export enum UserRole {
  None,
  User,
  Author,
  Admin,
}

export enum PublishStatus {
  None,
  Published,
  Draft,
}

export enum SubLevel {
  None,
  Free,
  Paid,
}

export type RatingScore = 1 | 2 | 3 | 4 | 5

export interface User {
  id: string
  email: string
  role: UserRole
  displayName: string
  stories: Story[]
  ratings: Rating[]
  subscriptions: Subscription[]
  subscribers: Subscription[]
  createdAt: Date
  updatedAt: Date
}

export interface Story {
  id: string
  author: User
  authorId: string
  chapters: Chapter[]
  comments: Comment[]
  title: string
  body: string
  summary: string
  enableCommenting: boolean
  status: PublishStatus
  ratings: Rating[]
  score: number
  genres: Genre[]
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface Chapter {
  id: string
  story: Story
  comments: Comment[]
  number: number
  title: string
  body: string
  summary: string
  enableCommenting: boolean
  status: PublishStatus
  ratings: Rating[]
  score: number
  previous: Chapter
  next: Chapter
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface Subscription {
  id: string
  subscriber: User
  subscribedTo: User
  level: SubLevel
  createdAt: Date
  updatedAt: Date
}

export interface Rating {
  id: string
  reader: User
  story: Story
  chapter?: Chapter
  score: number
  createdAt: Date
  updatedAt: Date
}

export interface Genre {
  id: string
  name: string
}

export interface Comment {
  id: string
  author: User
  body: string
  story?: Story
  chapter?: Chapter
}
