import { CopyClipBoard } from '@/components/copy.button'
import { ExpireDateComponent } from '@/components/expire.date'
import { LoaderComponent } from '@/components/loader'
import { NavigationComponent } from '@/components/navigation/Navigation'
import { PaginateComponent } from '@/components/paginate'
import { QrCodeComponent } from '@/components/qrCode'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { QUIZ_UNIQUE_URL } from '@/constants/app.constants'
import { ALL_QUIZ } from '@/constants/request.keys.constants'
import { formatDate } from '@/helpers/formate-date'
import { usePagination } from '@/hooks/use-pagination'
import { useUser } from '@/hooks/use-user'
import { userService } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export const HomePage = () => {
	const { user } = useUser()

	const { isLoading, data: quizes } = useQuery({
		queryKey: [ALL_QUIZ],
		queryFn: () => userService.fetchAllUserQuiz(),
		select: (data) => data.data,
	})

	const { handlePageChange, pageCount, currentQuizzes } = usePagination(
		quizes || []
	)

	return (
		<>
			<Helmet>
				<title>Мои тесты</title>
			</Helmet>
			<NavigationComponent />
			<div className="flex flex-col gap-3">
				<div className="my-5">
					<h4 className="font-medium flex items-baseline gap-2">
						Ваши тесты,
						<span className="text-sm text-sky-900">{user?.firstName}</span>
					</h4>
				</div>
				<Table className="border">
					<TableCaption>Таблица ваших тестов</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[360px]">Вопрос теста</TableHead>
							<TableHead>Актуален</TableHead>
							<TableHead>Дата создания</TableHead>
							<TableHead>Актуально в течении</TableHead>
							<TableHead>Ссылка</TableHead>
							<TableHead>QR код</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell>
									<div className="min-h-36">
										<LoaderComponent />
									</div>
								</TableCell>
							</TableRow>
						) : (
							user &&
							currentQuizzes &&
							currentQuizzes.map((quiz) => (
								<TableRow key={quiz.id}>
									<TableCell className="font-medium">
										<Link
											to={`/quiz/${quiz.id}`}
											className="font-medium text-sky-900 underline"
										>
											{quiz.title}
										</Link>
									</TableCell>
									<TableCell className="font-medium text-xs text-sky-900">
										до - {formatDate(quiz.expires)}
									</TableCell>
									<TableCell className="font-medium text-xs text-sky-900">
										{formatDate(quiz.createdAt)}
									</TableCell>
									<TableCell className="font-medium">
										<ExpireDateComponent date={quiz.expires} />
									</TableCell>
									<TableCell className="font-medium">
										<CopyClipBoard
											expire={quiz.expires}
											content={`${QUIZ_UNIQUE_URL}/quiz/testing/${quiz.url}`}
										/>
									</TableCell>
									<TableCell className="font-medium">
										<QrCodeComponent
											expire={quiz.expires}
											url={`${QUIZ_UNIQUE_URL}/quiz/testing/${quiz.url}`}
										/>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
				<PaginateComponent
					pageCount={pageCount}
					handlePageChange={handlePageChange}
				/>
			</div>
		</>
	)
}
