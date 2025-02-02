import { AuthContext } from '@/context/auth.context'
import { useContext } from 'react'

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('AuthContext is not allowed!')
	}
	return context
}
