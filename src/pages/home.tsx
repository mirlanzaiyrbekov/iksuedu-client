import { Button } from '@/components/button'
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

export const HomePage = () => {
	return (
		<>
			<Helmet>
				<title>Мои тесты</title>
			</Helmet>
			<div className="flex flex-col gap-10">
				<div className="my-2">
					<h4>Ваши тесты</h4>
				</div>
				<Table>
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
								Тест по знании Географии мира
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
