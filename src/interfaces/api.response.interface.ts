export interface IApiResponse {
	message: string
	success: boolean
}
export interface IQuizResponse extends IApiResponse {
	correctAnswers: number
	passedScore: number
	totalQuestions: number
	score: number
	passed: boolean
}
