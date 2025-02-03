import { Footer } from '@/components/footer/Footer'
import { Header } from '@/components/header/Header'
import { Toaster } from '@/components/ui/toaster'
import { saveUserToStorage } from '@/helpers/storage.helpers'
import { useUser } from '@/hooks/use-user'
import { useAuth } from '@/hooks/useAuth'
import { userService } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const Layout: React.FC = () => {
	const { isAuth } = useAuth()
	const { setUser } = useUser()

	const { data } = useQuery({
		queryKey: ['getUserProfile'],
		queryFn: () => userService.fetchUserProfile(),
		select: (data) => data.data,
		enabled: !!isAuth,
	})

	React.useEffect(() => {
		if (data) {
			setUser(data)
			saveUserToStorage(data)
		}
	}, [data])

	return (
		<>
			<Helmet>
				<title>Сдать тест</title>
				<meta
					name="description"
					content="Добро пожаловать на сдачу теста онлайн"
				/>
			</Helmet>
			<div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
				<Header />
				<main className="px-12">
					<Outlet />
					<Toaster />
				</main>
				<Footer />
			</div>
		</>
	)
}
