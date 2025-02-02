import {
	loadUserFromStorage,
	saveUserToStorage,
} from '@/helpers/storage.helpers'
import { IUser } from '@/interfaces/user.interface'
import { userService } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export const UserComponent: React.FC = () => {
	const [user, setUser] = React.useState<IUser | undefined>(
		loadUserFromStorage() || undefined
	)

	const { data } = useQuery({
		queryKey: ['getUserProfile'],
		queryFn: () => userService.fetchUserProfile(),
		select: (data) => data.data,
	})

	React.useEffect(() => {
		if (data) {
			setUser(data)
			saveUserToStorage(data)
		}
	}, [data])

	return (
		<>
			{user ? (
				<div className="flex items-center gap-1.5">
					<small className="text-xs text-sky-600">Привет,</small>
					<span className="text-sm">{user.firstName}</span>
				</div>
			) : null}
		</>
	)
}
