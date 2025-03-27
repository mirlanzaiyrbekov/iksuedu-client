import { z } from 'zod'

export const defendantScheme = z.object({
	fullName: z
		.string()
		.min(2, 'Минимальная длина 2 символа.')
		.max(355, 'Максимальная длина 355 символов')
		.nonempty(),
	phone: z
		.string()
		.min(9, 'Минимальная длина 9 символа.')
		.max(16, 'Максимальная длина 16 символов')
		.nonempty()
		.regex(/^\+996 \d{3} \d{3} \d{3}$/, {
			message: 'Номер должен быть в формате +996 XXX XXX XXX',
		}),
	school: z
		.string()
		.min(2, 'Минимальная длина 2 символа.')
		.max(355, 'Максимальная длина 355 символов')
		.nonempty(),
})
