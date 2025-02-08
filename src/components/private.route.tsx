import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import { Navigate } from 'react-router-dom'

interface IPrivateRouteProps {
	isPublic?: boolean
}
export const PrivateRoute: React.FC<
	React.PropsWithChildren<IPrivateRouteProps>
> = ({ children, isPublic }) => {
	const { isAuth } = useAuth()

	if (!isPublic && !isAuth) return <Navigate to={'/notfound'} />
	return children
}
