import { ConfirmContext } from '@/context/confirm.context'
import { useContext } from 'react'

export const useConfirm = () => {
	const context = useContext(ConfirmContext)
	if (!context) {
		throw new Error('Confirm Context is notfound!')
	}
	return context
}
