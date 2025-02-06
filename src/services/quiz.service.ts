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

	async fetchAllUserQuiz() {
		return await apiBase<IQuiz[]>({
			url: `/quiz`,
			method: 'GET',
		})
	},

	async fetchQuizById(id: string) {
		return await apiBase<IQuiz>({
			url: `/quiz/${id}`,
			method: 'GET',
		})
	},

	async deleteQuiz(id?: string) {
		return await apiBase<IApiResponse>({
			url: `/quiz/${id}`,
			method: 'DELETE',
		})
	},

	async deleteQuestion(id?: string) {
		return await apiBase<IApiResponse>({
			url: `/quiz/question/${id}`,
			method: 'DELETE',
		})
	},

	async deleteAnswer(id?: string) {
		return await apiBase<IApiResponse>({
			url: `/quiz/question/answer/${id}`,
			method: 'DELETE',
		})
	},
}
