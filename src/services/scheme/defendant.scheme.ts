import { z } from 'zod'

export const defendantScheme = z.object({
	firstName: z
		.string()
		.min(2, 'Минимальная длина 2 символа.')
		.max(255, 'Максимальная длина 255 символов'),
	lastName: z
		.string()
		.min(2, 'Минимальная длина 2 символа.')
		.max(255, 'Максимальная длина 255 символов'),
	email: z
		.string()
		.min(2, 'Минимальная длина 2 символа.')
		.max(255, 'Максимальная длина 255 символов')
		.email({ message: 'Ведите валидный E-mail' }),
	school: z
		.string()
		.min(2, 'Минимальная длина 2 символа.')
		.max(355, 'Максимальная длина 355 символов'),
})
