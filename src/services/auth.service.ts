import apiBase from '@/api/api-base'
import { IAuthLoginResponse } from '@/interfaces/api.response.interface'
import { SignInType } from '@/types/form.types'
import { z } from 'zod'
import { signUpScheme } from './scheme/auth.scheme'

export const authService = {
	/**
	 *
	 * @param data
	 * @description Sign in user
	 */
	async signIn(data: SignInType) {
		return await apiBase<IAuthLoginResponse>({
			url: '/auth/signin',
			method: 'POST',
			data,
		})
	},
	/**
	 *
	 * @param data
	 * @description Sign up user
	 */
	async signUp(data: z.infer<typeof signUpScheme>) {
		return await apiBase<Pick<IAuthLoginResponse, 'message' | 'success'>>({
			url: '/auth/signup',
			method: 'POST',
			data,
		})
	},
}
