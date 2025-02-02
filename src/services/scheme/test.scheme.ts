import { z } from 'zod'

export const createTestScheme = z.object({
	title: z
		.string()
		.min(2, 'Минимальная длина 2 символа.')
		.max(50, 'Максимальная длина 50 символов'),
})
