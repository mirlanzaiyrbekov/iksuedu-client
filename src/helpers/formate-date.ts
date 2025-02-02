export function formatDate(isoDateString: string) {
	const date = new Date(isoDateString)

	// Форматируем дату (YYYY-MM-DD)
	const formattedDate = date.toISOString().split('T')[0]

	// Форматируем время (HH:mm:ss)
	const time = date.toTimeString().split(' ')[0]

	// Соединяем через "/"
	return `${formattedDate} ${time}`
}
