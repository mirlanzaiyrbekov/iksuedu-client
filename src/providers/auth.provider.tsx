import { AuthContext } from '@/context/auth.context'
import React from 'react'

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [isAuth, setIsAuth] = React.useState(false)

	const setAuthHandle = () => setIsAuth(!isAuth)

	return (
		<AuthContext.Provider value={{ isAuth, setAuthHandle }}>
			{children}
		</AuthContext.Provider>
	)
}
