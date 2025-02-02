import apiBase from '@/api/api-base'
import { z } from 'zod'
import { signInScheme, signUpScheme } from './scheme/auth.scheme'

interface IAuthLoginResponse {
	access_token: string
	message: string
	success: boolean
}
export const authService = {
	async signIn(data: z.infer<typeof signInScheme>) {
		return await apiBase<IAuthLoginResponse>({
			url: '/auth/signin',
			method: 'POST',
			data,
		})
	},
	async signUp(data: z.infer<typeof signUpScheme>) {
		return await apiBase<Pick<IAuthLoginResponse, 'message' | 'success'>>({
			url: '/auth/signup',
			method: 'POST',
			data,
		})
	},
}
