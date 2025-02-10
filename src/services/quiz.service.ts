import apiBase from '@/api/api-base'
import {
	IApiResponse,
	IQuizResponse,
} from '@/interfaces/api.response.interface'
import { IQuizForm } from '@/interfaces/form.interface'
import { IQuiz } from '@/interfaces/quiz.interface'

export const quizService = {
	/**
	 * @param data
	 * @description CREATE QUIZ
	 */
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

	/**
	 *
	 * @param data
	 * @description PROCESS QUIZ
	 */
	async processQuiz(data: any) {
		return await apiBase<IQuizResponse>({
			url: `/quiz/process`,
			method: 'POST',
			data,
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
