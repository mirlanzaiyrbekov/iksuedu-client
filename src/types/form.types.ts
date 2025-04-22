import { signInScheme } from '@/services/scheme/auth.scheme'
import { z } from 'zod'

export type FieldArrayType = { content: string }
export type SignInType = z.infer<typeof signInScheme>
