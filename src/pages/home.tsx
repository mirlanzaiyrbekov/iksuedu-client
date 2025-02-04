import { NavigationComponent } from '@/components/navigation/Navigation'
import { QrCodeComponent } from '@/components/qrCode'
import { Button } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { calculateDate, formatDate } from '@/helpers/formate-date'
import { useUser } from '@/hooks/use-user'
import { Link as LinkIcon } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export const HomePage = () => {
	const { user } = useUser()

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
						<span className="text-sm text-sky-600">{user?.firstName}</span>
					</h4>
				</div>
				<Table className="border">
					<TableCaption>Таблица ваших тестов</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[300px]">Вопрос теста</TableHead>
							<TableHead>Актуален</TableHead>
							<TableHead>Дата создания</TableHead>
							<TableHead>Актуально в течении</TableHead>
							<TableHead>Ссылка</TableHead>
							<TableHead>QR код</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{user &&
							user.tests.map((quiz) => (
								<TableRow key={quiz.id}>
									<TableCell className="font-medium">
										<Link to={`/quiz/${quiz.id}`}>{quiz.title}</Link>
									</TableCell>
									<TableCell className="font-medium">
										До: {formatDate(quiz.expires)}
									</TableCell>
									<TableCell className="font-medium">
										{formatDate(quiz.createdAt)}
									</TableCell>
									<TableCell className="font-medium">
										{calculateDate(quiz.createdAt, quiz.expires)}
										-Дней
									</TableCell>
									<TableCell className="font-medium">
										<Button variant={'outline'} size={'sm'}>
											<LinkIcon />
										</Button>
									</TableCell>
									<TableCell className="font-medium">
										<QrCodeComponent />
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
		</>
	)
}
