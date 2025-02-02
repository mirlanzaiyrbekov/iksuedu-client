import { IBase } from './base.interface'

export interface IUser extends IBase {
	firstName: string
	lastName: string
	thirdName: string
	email: string
	phone: string
}
