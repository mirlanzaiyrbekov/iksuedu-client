import apiBase from '@/api/api-base'
import { IApiResponse } from '@/interfaces/api.response.interface'
import { IQuizForm } from '@/interfaces/form.interface'
import { IQuiz } from '@/interfaces/quiz.interface'

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
			url: `/quiz/${data.id}`,
			method: 'PATCH',
			data,
		})
	},

	async fetchQuizById(id: string) {
		return await apiBase<IQuiz>({
			url: `/quiz/${id}`,
			method: 'GET',
		})
	},
}
