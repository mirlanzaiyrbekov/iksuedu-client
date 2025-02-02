import { IBase } from './base.interface'
import { IQuiz } from './quiz.interface'

export interface IUser extends IBase {
	firstName: string
	lastName: string
	email: string
	tests: IQuiz[]
}
