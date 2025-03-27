import apiBase from '@/api/api-base'
import { IApiResponse } from '@/interfaces/api.response.interface'
import { IAnswers, IDefendand } from '@/interfaces/quiz.interface'

export const defendantService = {
	async registerDefendant(data: any) {
		return await apiBase<{ data: string } & IApiResponse>({
			url: `/defendant`,
			method: 'POST',
			data,
		})
	},
	async fetchDefendantById(id: string) {
		return await apiBase<IDefendand>({
			url: `/defendant/${id}`,
			method: 'GET',
		})
	},

	async fetchAnswers(quizId: string, defendantId: string) {
		return await apiBase<IAnswers[]>({
			url: `/defendant/answers/${quizId}/${defendantId}`,
			method: 'GET',
		})
	},
}
