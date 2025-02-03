import { intervalToDuration } from 'date-fns'

export function formatDate(isoDateString: Date) {
	const date = new Date(isoDateString)

	// Форматируем дату (YYYY-MM-DD)
	const formattedDate = date.toISOString().split('T')[0]

	// Форматируем время (HH:mm:ss)
	const time = date.toTimeString().split(' ')[0]

	// Соединяем через "/"
	return `${formattedDate} ${time}`
}

export const calculateDate = (startDate: Date, endDate: Date) => {
	const start = new Date(startDate)
	const end = new Date(endDate)
	const duration = intervalToDuration({ start, end })

	return duration.days
}
