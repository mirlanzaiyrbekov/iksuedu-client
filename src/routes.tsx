import { createBrowserRouter } from 'react-router-dom'
// import { AuthPage } from './pages/auth'
// import { CreateTestPage } from './pages/crud/create'
// import { UpdateTestPage } from './pages/crud/update'
// import { DefendantAnswersPage } from './pages/defendant/answers'
// import { QuizPage } from './pages/quiz/quiz'
// import { QuizProcessPage } from './pages/quiz/quiz.process'
import { Welcome } from './components/welcome/welcome'
import { NotFoundPage } from './pages/not-found'

export const routes = createBrowserRouter([
	{
		path: '/',
		element: <Welcome />,
		children: [
			// {
			// 	index: true,
			// 	element: <PrivateRoute children={<HomePage />} />,
			// },
			// {
			// 	path: '/auth',
			// 	element: <PrivateRoute children={<AuthPage />} isPublic />,
			// },
			// {
			// 	path: '/quiz/:id',
			// 	element: <PrivateRoute children={<QuizPage />} />,
			// },
			// {
			// 	path: '/quiz/update/:id',
			// 	element: <PrivateRoute children={<UpdateTestPage />} />,
			// },
			// {
			// 	path: '/create',
			// 	element: <PrivateRoute children={<CreateTestPage />} />,
			// },
			// {
			// 	path: '/update',
			// 	element: <PrivateRoute children={<UpdateTestPage />} />,
			// },
			// {
			// 	path: '/quiz/testing/:url',
			// 	element: <QuizProcessPage />,
			// },
			// {
			// 	path: '/defendant/answers/:quizId/:defendantId',
			// 	element: <PrivateRoute children={<DefendantAnswersPage />} />,
			// },
			// {
			// 	path: '/*',
			// 	element: <NotFoundPage />,
			// },
		],
		errorElement: <NotFoundPage />,
	},
])
