export declare enum UserRole {
    None = 0,
    Reader = 1,
    Writer = 2,
    Author = 3,
    Admin = 4
}
export declare enum PublishStatus {
    None = 0,
    Published = 1,
    Draft = 2
}
export declare enum SubLevel {
    None = 0,
    Free = 1,
    Paid = 2
}
export declare enum FeedbackType {
    General = 0,
    Bug = 1,
    Feature = 2
}
export declare type RatingScore = 1 | 2 | 3 | 4 | 5;
export interface User {
    id: string;
    email: string;
    role: UserRole;
    penName: string;
    paymentMethods: StripeSource[];
    roleSubscription: StripeSubscription;
    stories: Story[];
    favoriteStories: Story[];
    favoriteGenres: Genre[];
    ratings: Rating[];
    canAcceptPayments: boolean;
    stripeAccountError?: String;
    subscriptions: Subscription[];
    subscribers: Subscription[];
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
}
export interface Content {
    id: string;
    title: string;
    body: string;
    summary: string;
    enableCommenting: boolean;
    status: PublishStatus;
    number?: number;
}
export interface Story extends Content {
    author: User;
    authorId: string;
    chapters: Chapter[];
    comments: Comment[];
    ratings: Rating[];
    rateStatus: number;
    score: number;
    reads: number;
    genres: Genre[];
    publishedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface Chapter extends Content {
    author: User;
    story: Story;
    comments: Comment[];
    number: number;
    ratings: Rating[];
    rateStatus: number;
    score: number;
    reads: number;
    previous: Chapter;
    next: Chapter;
    publishedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface Subscription {
    id: string;
    subscriber: User;
    subscribedTo: User;
    level: SubLevel;
    createdAt: Date;
    updatedAt: Date;
}
export interface Rating {
    id: string;
    reader: User;
    story: Story;
    chapter?: Chapter;
    score: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface Genre {
    id: string;
    name: string;
}
export interface Comment {
    id: string;
    author: User;
    body: string;
    story?: Story;
    chapter?: Chapter;
    updatedAt: Date;
    createdAt: Date;
}
export interface StripeSource {
    id: string;
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
    name: string;
}
export interface StripeSubscription {
    id: string;
    createdAt: Date;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    price: number;
    interval: string;
}
//# sourceMappingURL=types.d.ts.map