import CryptoJS from 'crypto-js'

import { USER_INFO_SECRET_KEY } from '@/constants/app.constants'
import { UserEnum } from '@/enum/user.enum'
import { IUser } from '@/interfaces/user.interface'

export const saveToStorage = (name: string, data: any) => {
	localStorage.setItem(name, data)
}
export const getFromStorageSafe = (key: string) => {
	try {
		const stored = localStorage.getItem(key)
		return stored ? JSON.parse(stored) : null
	} catch (error) {
		return null
	}
}
export const getFromStorage = (name: string) => {
	try {
		return localStorage.getItem(name)
	} catch (error) {
		return null
	}
}

export const removeFromStorage = (name: string) => {
	localStorage.removeItem(name)
}

export const saveUserToStorage = (user: IUser) => {
	try {
		// Преобразуем объект пользователя в строку JSON
		const userData = JSON.stringify(user)

		// Шифруем данные
		const encryptedData = CryptoJS.AES.encrypt(
			userData,
			USER_INFO_SECRET_KEY
		).toString()

		// Сохраняем зашифрованные данные в localStorage
		localStorage.setItem(UserEnum.USER_TO_STORAGE, encryptedData)
	} catch (error) {
		console.error('Ошибка при сохранении данных пользователя:', error)
	}
}

export const loadUserFromStorage = (): IUser | null => {
	try {
		const encryptedData = localStorage.getItem(UserEnum.USER_TO_STORAGE)
		if (!encryptedData) return null

		// Расшифровка данных
		const bytes = CryptoJS.AES.decrypt(encryptedData, USER_INFO_SECRET_KEY)
		const decryptedData = bytes.toString(CryptoJS.enc.Utf8)

		// Преобразование обратно в объект
		return JSON.parse(decryptedData)
	} catch (error) {
		console.error('Ошибка при загрузке данных пользователя:', error)
		return null
	}
}
