import { IUser } from '@/interfaces/user.interface'
import React, { createContext, SetStateAction } from 'react'

export interface IUserContext {
	user: IUser | undefined
	logOutHandle: () => void
	setUser: React.Dispatch<SetStateAction<IUser | undefined>>
}
const initialState: IUserContext = {
	user: undefined,
	logOutHandle: () => {},
	setUser: () => {},
}
export const UserContext = createContext(initialState)
