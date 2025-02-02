import { UserContext } from '@/context/user.context'
import { useContext } from 'react'

export const useUser = () => {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error('UserContext is not allowed!')
	}
	return context
}
