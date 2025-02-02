import { z } from 'zod'

export const signUpScheme = z.object({
	firstName: z
		.string({ message: 'Имя должно быть в строковом формате' })
		.min(2, 'Минимальная длина 2 символа.')
		.max(50, 'Максимальная длина 50 символов'),
	lastName: z
		.string()
		.min(2, 'Минимальная длина 2 символа.')
		.max(50, 'Максимальная длина 50 символов'),
	password: z
		.string()
		.min(2, 'Минимальная длина 2 символа.')
		.max(50, 'Максимальная длина 50 символов'),
	email: z
		.string()
		.min(2, 'Минимальная длина 2 символа.')
		.max(50, 'Максимальная длина 50 символов')
		.email({ message: 'Введите валидный E-mail' }),
})

export const signInScheme = z.object({
	email: z
		.string()
		.min(2, 'Минимальная длина 2 символа.')
		.max(50, 'Максимальная длина 50 символов')
		.email({ message: 'Введите валидный E-mail' }),

	password: z
		.string()
		.min(2, 'Минимальная длина 2 символа.')
		.max(50, 'Максимальная длина 50 символов'),
})
