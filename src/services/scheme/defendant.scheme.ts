import { z } from 'zod'

export const defendantScheme = z.object({
	fullName: z
		.string()
		.min(2, 'Минимальная длина 2 символа.')
		.max(355, 'Максимальная длина 355 символов')
		.nonempty(),
	email: z.string().email({ message: 'Введите валидный e-mail' }),
	school: z
		.string()
		.min(2, 'Минимальная длина 2 символа.')
		.max(355, 'Максимальная длина 355 символов')
		.nonempty(),
})
