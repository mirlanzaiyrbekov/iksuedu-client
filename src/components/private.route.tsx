import { useUser } from '@/hooks/use-user'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface IPrivateRouteProps {
	isPublic?: boolean
}
export const PrivateRoute: React.FC<
	React.PropsWithChildren<IPrivateRouteProps>
> = ({ children, isPublic }) => {
	const { user } = useUser()
	const { pathname } = useLocation()

	if (!isPublic && !user) return <Navigate to={'/auth'} />
	if (user && pathname === '/auth') return <Navigate to={'/'} />

	return children
}
