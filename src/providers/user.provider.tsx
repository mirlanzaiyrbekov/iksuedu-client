import { UserContext } from '@/context/user.context'
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

export const UserProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
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
		setAuthHandle()
		setUser(undefined)
		queryClient.invalidateQueries({ queryKey: ['getUserProfile'] })
	}

	return (
		<UserContext.Provider value={{ user, logOutHandle }}>
			{children}
		</UserContext.Provider>
	)
}
