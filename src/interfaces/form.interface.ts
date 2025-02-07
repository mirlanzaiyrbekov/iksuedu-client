import {
	Control,
	FieldArrayWithId,
	UseFieldArrayAppend,
	UseFieldArrayRemove,
} from 'react-hook-form'

export interface IAnswer {
	id?: string
	content?: string
	isCorrect?: boolean
	customId?: string
}
export interface IQuestion {
	id?: string
	content?: string
	answers?: IAnswer[]
	customId?: string
}
export interface IQuizForm {
	id?: string
	title?: string
	expires?: Date | undefined
	teacherId?: string
	questions?: IQuestion[]
}
export interface IQuestionFormProps {
	questions: FieldArrayWithId<IQuizForm, 'questions'>[] // Массив вопросов
	control: Control<IQuizForm> // Контрол формы
	remove: UseFieldArrayRemove // Функция для удаления вопросов
	append: UseFieldArrayAppend<IQuizForm, 'questions'> // Функция для добавления вопросов
	formType: 'CREATE' | 'UPDATE'
}
