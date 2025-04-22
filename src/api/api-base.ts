import { APP_URI } from '@/constants/app.constants'
import { AuthEnum } from '@/enum/auth.enum'
import { UserEnum } from '@/enum/user.enum'
import { getFromStorage, removeFromStorage } from '@/helpers/storage.helpers'
import axios from 'axios'
import { errorCatch } from './api-helper'

const apiBase = axios.create({
	baseURL: APP_URI,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
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
		if (
			error?.response?.status === 401 &&
			error?.response?.statusText === 'Unauthorized' &&
			!error.config._isRetry
		) {
			removeFromStorage(UserEnum.USER_TO_STORAGE)
			removeFromStorage(AuthEnum.ACCESS_TOKEN)
			removeFromStorage(AuthEnum.IS_AUTHENTIFICATION)
			window.location.pathname = '/auth'
		}
		return Promise.reject(errorCatch(error))
	}
)

export default apiBase
