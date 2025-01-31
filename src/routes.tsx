import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './layout/layout'
import { AuthPage } from './pages/auth'
import { HomePage } from './pages/home'
import { NotFoundPage } from './pages/not-found'

export const routes = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: '/auth',
				element: <AuthPage />,
			},
			{
				path: '/home/*',
				element: <NotFoundPage />,
			},
		],
	},
])
