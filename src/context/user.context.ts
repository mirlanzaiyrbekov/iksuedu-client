import { IUser } from '@/interfaces/user.interface'
import { createContext } from 'react'

export interface IUserContext {
	user: IUser | undefined
	logOutHandle: () => void
}
const initialState: IUserContext = {
	user: undefined,
	logOutHandle: () => {},
}
export const UserContext = createContext(initialState)
