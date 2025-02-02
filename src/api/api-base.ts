import { APP_URI } from '@/constants/app.constants'
import { AuthEnum } from '@/enum/auth.enum'
import { getFromStorage } from '@/helpers/storage.helpers'
import axios from 'axios'
import { errorCatch, getContentType } from './api-helper'

const apiBase = axios.create({
	baseURL: APP_URI,
	headers: getContentType(),
	withCredentials: true,
})

apiBase.interceptors.request.use(
	async (config) => {
		const accessToken = getFromStorage(AuthEnum.ACCESS_TOKEN)
		if (config.headers && accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}
		return config
	},
	(error) => Promise.reject(error)
)

apiBase.interceptors.response.use(
	(config) => config,
	async (error) => {
		// const originalRequest = error.config
		// if (error?.response?.status === 401 && !error.config._isRetry) {
		// 	originalRequest._isRetry = true
		// 	try {
		// 		const refreshToken = getRefreshTokenFromStorage()
		// 		if (refreshToken) {
		// 			const data = await AuthService.refreshToken(refreshToken)
		// 			if (data.refreshToken && data.accessToken) {
		// 				saveToLocalStorage(data.accessToken)
		// 				saveToLocalStorage(data.refreshToken)
		// 				// Повторяем оригинальный запрос с обновленным токеном
		// 				return apiBase.request(originalRequest)
		// 			} else {
		// 			}
		// 		}
		// 		throw new Error('Failed to refresh tokens or tokens data not received')
		// 	} catch (err) {
		// 		if (errorCatch(err) === 'jwt must be provided') {
		// 			clearTokensOnStorage()
		// 		}
		// 		return Promise.reject(errorCatch(error))
		// 	}
		// }
		// Обрабатываем другие ошибки
		return Promise.reject(errorCatch(error))
	}
)

export default apiBase
