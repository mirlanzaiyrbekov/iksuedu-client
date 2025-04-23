import { signInScheme } from '@/services/scheme/auth.scheme'
import { defendantScheme } from '@/services/scheme/defendant.scheme'
import { z } from 'zod'

export type FieldArrayType = { content: string }
export type SignInType = z.infer<typeof signInScheme>
export type DefendatTypeRegister = z.infer<typeof defendantScheme>