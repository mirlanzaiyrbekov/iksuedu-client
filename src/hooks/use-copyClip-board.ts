import { toast } from './use-toast'

export const useCopyClipBoard = () => {
	const handleCopy = (content: string) => {
		navigator.clipboard
			.writeText(content)
			.then(() => {
				toast({
					title: 'Скопировано в буфер обмена',
				})
			})
			.catch((error) => {
				console.error('Ошибка при копировании в буфер обмена: ', error)
			})
	}
	return handleCopy
}
