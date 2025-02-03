import { UserContext } from '@/context/user.context'
import { AuthEnum } from '@/enum/auth.enum'
import { UserEnum } from '@/enum/user.enum'
import {
	loadUserFromStorage,
	removeFromStorage,
} from '@/helpers/storage.helpers'
import { useAuth } from '@/hooks/useAuth'
import { IUser } from '@/interfaces/user.interface'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

export const UserProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [user, setUser] = React.useState<IUser | undefined>(
		loadUserFromStorage() || undefined
	)
	const { setAuthHandle } = useAuth()
	const queryClient = useQueryClient()

	const logOutHandle = () => {
		removeFromStorage(UserEnum.USER_TO_STORAGE)
		removeFromStorage(AuthEnum.ACCESS_TOKEN)
		removeFromStorage(AuthEnum.IS_AUTHENTIFICATION)
		setAuthHandle()
		setUser(undefined)
		queryClient.invalidateQueries({ queryKey: ['getUserProfile'] })
	}

	return (
		<UserContext.Provider value={{ user, logOutHandle, setUser }}>
			{children}
		</UserContext.Provider>
	)
}
