import { IBase } from './base.interface'
import { IQuestion } from './form.interface'
import { IUser } from './user.interface'

export interface IQuiz extends IBase {
	title: string
	expires: Date
	teacher: IUser
	url: string
	passed: number
	didNotPass: number
	passedScore: number
	questions: IQuizQuestions[]
	defendants: IDefendand[]
}

export interface IDefendand extends IBase {
	firstName: string
	lastName: string
	email: string
	school: string
	tests: IQuiz[]
	score: number
	passed: boolean
}

export interface IAnswers extends IBase {
	defendantId: string
	quizId: string
	questionId: string
	answerId: string
	defendant: IDefendand
	question: IQuestion
	answer: IQuizQuestionsAnswers
	quiz: IQuiz
}

export interface IQuizQuestions extends IBase {
	content: string
	answers: IQuizQuestionsAnswers[]
}

export interface IQuizQuestionsAnswers extends IBase {
	content: string
	isCorrect: boolean
	defendantAnswers?: IQuizQuestionsAnswers
}
