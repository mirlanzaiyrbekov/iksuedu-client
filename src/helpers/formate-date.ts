import { differenceInDays } from 'date-fns'

export function formatDate(isoDateString: Date) {
	const date = new Date(isoDateString)

	// Форматируем дату (YYYY-MM-DD)
	const formattedDate = date.toISOString().split('T')[0]

	// Форматируем время (HH:mm:ss)
	const time = date.toTimeString().split(' ')[0]

	//  awd2025awdadw02awd25
	// Соединяем через "/" timeExpire => 100000000 => 12.40
	return `${formattedDate} ${time}`
}

export const calculateDate = (startDate: Date, endDate: Date) => {
	const start = new Date(startDate)
	const end = new Date(endDate)

	// Проверяем, если дата уже прошла, то возвращаем 0
	if (end < new Date()) return 'Не активен'

	// Альтернативный вариант вычисления разницы в днях
	const daysLeft = differenceInDays(end, start)

	return daysLeft > 0 ? daysLeft : 0
}

export const expireDate = (date: Date) => {
	const now = new Date()

	if (date < now) {
		return true
	}
	return false
}
