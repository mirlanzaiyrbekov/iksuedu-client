import { z } from 'zod'

export const answerScheme = z.object({
	content: z
		.string()
		.min(2, 'Минимальная длина 2 символа.')
		.max(255, 'Максимальная длина 255 символов'),
})
