import { IBase } from './base.interface'
import { IUser } from './user.interface'

export interface IQuiz extends IBase {
	title: string
	expires: Date
	teacher: IUser
	url: string
	questions: IQuizQuestions[]
	defendants: IDefendand[]
}

export interface IDefendand extends IBase {
	firstName: string
	lastName: string
	email: string
	school: string
	tests: IQuiz[]
}

export interface IQuizQuestions extends IBase {
	content: string
	answers: IQuizQuestionsAnswers[]
}

export interface IQuizQuestionsAnswers extends IBase {
	content: string
	isCorrect: boolean
}
