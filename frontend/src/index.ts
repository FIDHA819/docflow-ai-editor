export interface User {
  _id: string
  name: string
  email: string
}

export interface DocumentShare {
  userId: string
  email: string
  name: string
  grantedAt: string
}

export interface Document {
  _id: string
  title: string
  content: string
  ownerId: string
  ownerName: string
  ownerEmail: string
  sharedWith: DocumentShare[]
  createdAt: string
  updatedAt: string
  isOwner?: boolean
}

export interface AuthResponse {
  token: string
  user: User
}

export interface ApiError {
  message: string
}

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'