import { useUser } from '@/hooks/use-user'
import React from 'react'
import { Navigate } from 'react-router-dom'

interface IPrivateRouteProps {
	isPublic?: boolean
}
export const PrivateRoute: React.FC<
	React.PropsWithChildren<IPrivateRouteProps>
> = ({ children, isPublic }) => {
	const { user } = useUser()

	if (!isPublic && !user) return <Navigate to={'/notfound'} />
	return children
}
