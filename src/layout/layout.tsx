import { Footer } from '@/components/footer/Footer'
import { Header } from '@/components/header/Header'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const Layout: React.FC = () => {
	return (
		<>
			<Helmet defaultTitle="Iksu Academy">
				<meta
					name="description"
					content="Добро пожаловать на сдачу теста онлайн"
				/>
			</Helmet>
			<div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
				<Header />
				<main className="mobile-xs:px-2 mobile-sm:p-5 mobile-md:p-8">
					<Outlet />
					<Toaster />
				</main>
				<Footer />
			</div>
		</>
	)
}
