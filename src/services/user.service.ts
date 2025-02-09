import apiBase from '@/api/api-base'
import { IQuiz } from '@/interfaces/quiz.interface'
import { IUser } from '@/interfaces/user.interface'

export const userService = {
	async fetchUserProfile() {
		return await apiBase<IUser>({
			url: '/user/profile',
			method: 'GET',
		})
	},

	async fetchAllUserQuiz() {
		return await apiBase<IQuiz[]>({
			url: `/user`,
			method: 'GET',
		})
	},
}
