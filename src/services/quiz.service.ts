import apiBase from '@/api/api-base'
import {
	IApiResponse,
	IQuizResponse,
} from '@/interfaces/api.response.interface'
import { IQuizForm } from '@/interfaces/form.interface'
import { IDefendand, IQuiz } from '@/interfaces/quiz.interface'

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

	async registerDefendant(
		data: Pick<IDefendand, 'firstName' | 'lastName' | 'email' | 'school'>
	) {
		return await apiBase<IApiResponse>({
			url: `/quiz/defendant`,
			method: 'POST',
			data,
		})
	},

	async quizResults(data: any) {
		return await apiBase<IQuizResponse>({
			url: `/quiz/results`,
			method: 'POST',
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

	async fetchQuizByUrl(url?: string) {
		return await apiBase<IQuiz>({
			url: `/quiz/by-url/${url}`,
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
