import { AuthEnum } from '@/enum/auth.enum'
import { UserEnum } from '@/enum/user.enum'
import {
	loadUserFromStorage,
	removeFromStorage,
	saveUserToStorage,
} from '@/helpers/storage.helpers'
import { useAuth } from '@/hooks/useAuth'
import { IUser } from '@/interfaces/user.interface'
import { userService } from '@/services/user.service'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { Button } from './ui/button'

export const UserComponent: React.FC = () => {
	const [user, setUser] = React.useState<IUser | undefined>(
		loadUserFromStorage() || undefined
	)
	const { isAuth, setAuthHandle } = useAuth()
	const queryClient = useQueryClient()
	const { data } = useQuery({
		queryKey: ['getUserProfile'],
		queryFn: () => userService.fetchUserProfile(),
		select: (data) => data.data,
		enabled: !!isAuth,
		retry: false,
	})

	React.useEffect(() => {
		if (data) {
			setUser(data)
			saveUserToStorage(data)
		}
	}, [data])

	const logOutHandle = () => {
		removeFromStorage(UserEnum.USER_TO_STORAGE)
		removeFromStorage(AuthEnum.ACCESS_TOKEN)
		removeFromStorage(AuthEnum.IS_AUTHENTIFICATION)
		setUser(undefined)
		setAuthHandle()
		queryClient.invalidateQueries({ queryKey: ['getUserProfile'] })
	}

	return (
		<>
			{user ? (
				<div className="flex items-center gap-1.5">
					<small className="text-xs text-sky-600">Привет,</small>
					<span className="text-sm">{user.firstName}</span>
					<Button
						className="text-xs text-white"
						variant={'link'}
						onClick={logOutHandle}
					>
						Выйти
					</Button>
				</div>
			) : null}
		</>
	)
}
