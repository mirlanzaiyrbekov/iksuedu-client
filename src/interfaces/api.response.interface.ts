export interface IApiResponse {
	message: string
	success: boolean
}
export interface IQuizResponse extends IApiResponse {
	correctAnswers: number
	totalQuestions: number
	score: number
}
