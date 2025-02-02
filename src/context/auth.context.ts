import { createContext } from 'react'

export interface IAuthContext {
	isAuth: boolean
	setAuthHandle: () => void
}
const initialState: IAuthContext = {
	isAuth: false,
	setAuthHandle: () => {},
}
export const AuthContext = createContext(initialState)
