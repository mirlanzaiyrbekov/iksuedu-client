import { z } from 'zod'

export const defendantScheme = z.object({
	fullName: z
		.string()
		.min(2, 'Минимальная длина 2 символа.')
		.max(355, 'Максимальная длина 355 символов'),
	phone: z
		.string()
		.min(9, 'Минимальная длина 9 символа.')
		.max(16, 'Максимальная длина 16 символов'),
	school: z
		.string()
		.min(2, 'Минимальная длина 2 символа.')
		.max(355, 'Максимальная длина 355 символов'),
})
