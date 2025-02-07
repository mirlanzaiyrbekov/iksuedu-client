import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './layout/layout'
import { AuthPage } from './pages/auth'
import { CreateTestPage } from './pages/crud/create'
import { UpdateTestPage } from './pages/crud/update'
import { HomePage } from './pages/home'
import { NotFoundPage } from './pages/not-found'
import { QuizPage } from './pages/quiz/quiz'
import { QuizProcessPage } from './pages/quiz/quiz.process'

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
				path: '/quiz/:id',
				element: <QuizPage />,
			},
			{
				path: '/quiz/update/:id',
				element: <UpdateTestPage />,
			},
			{
				path: '/create',
				element: <CreateTestPage />,
			},
			{
				path: '/update',
				element: <UpdateTestPage />,
			},
			{
				path: '/quiz/testing/:url',
				element: <QuizProcessPage />,
			},
			{
				path: '/*',
				element: <NotFoundPage />,
			},
		],
	},
])
