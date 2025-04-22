export interface IApiResponse {
	message: string
	success: boolean
	expire?: boolean
}
export interface IQuizResponse extends IApiResponse {
	correctAnswers: number
	passedScore: number
	totalQuestions: number
	score: number
	passed: boolean
}
export interface IAuthLoginResponse extends IApiResponse {
	access_token: string
}
