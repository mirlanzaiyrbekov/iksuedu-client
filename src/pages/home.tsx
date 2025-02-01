import { Button } from '@/components/button'
import { NavigationComponent } from '@/components/navigation/Navigation'
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
import { Link as LinkIcon } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export const HomePage = () => {
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
						<span className="text-sm text-sky-600">Username</span>
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
						<TableRow>
							<TableCell className="font-medium">
								<Link to={`/tests/awdawdwd`}>
									Тест по знании Географии мира
								</Link>
							</TableCell>
							<TableCell className="font-medium">Да</TableCell>
							<TableCell className="font-medium">20.01.2025</TableCell>
							<TableCell className="font-medium">12 дней</TableCell>
							<TableCell className="font-medium">
								<Button variant={'outline'} size={'sm'}>
									<LinkIcon />
								</Button>
							</TableCell>
							<TableCell className="font-medium">
								<QrCodeComponent />
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</>
	)
}
