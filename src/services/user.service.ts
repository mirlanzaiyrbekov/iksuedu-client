import apiBase from '@/api/api-base'
import { IUser } from '@/interfaces/user.interface'

export const userService = {
	async fetchUserProfile() {
		return await apiBase<IUser>({
			url: '/user/profile',
			method: 'GET',
		})
	},
}
