import {
	Control,
	FieldArrayWithId,
	UseFieldArrayAppend,
	UseFieldArrayRemove,
} from 'react-hook-form'

export interface IAnswer {
	content: string
	isCorrect: boolean
}
export interface IQuestion {
	content: string
	answers: IAnswer[]
}
export interface ICreateTest {
	title: string
	expires: Date | undefined
	questions: IQuestion[]
}
export interface IQuestionFormProps {
	questions: FieldArrayWithId<ICreateTest, 'questions'>[] // Массив вопросов
	control: Control<ICreateTest> // Контрол формы
	remove: UseFieldArrayRemove // Функция для удаления вопросов
	append: UseFieldArrayAppend<ICreateTest, 'questions'> // Функция для добавления вопросов
}
