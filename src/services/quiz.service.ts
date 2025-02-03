import apiBase from '@/api/api-base'
import { IApiResponse } from '@/interfaces/api.response.interface'
import { IQuizForm } from '@/interfaces/form.interface'

export const quizService = {
	async createQuiz(data: IQuizForm) {
		return await apiBase<IApiResponse>({
			url: '/quiz',
			method: 'POST',
			data,
		})
	},

	async updateQuiz(data: IQuizForm) {
		return await apiBase<IApiResponse>({
			url: '/quiz',
			method: 'POST',
			data,
		})
	},
}
