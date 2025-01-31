import { Button } from '@/components/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Link as LinkIcon, QrCode } from 'lucide-react'
import QRCode from 'react-qr-code'

export const HomePage = () => {
	return (
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
							<Dialog>
								<DialogTrigger>
									<Button variant={'outline'} size={'sm'}>
										<QrCode />
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>QR код. Отсканируйте</DialogTitle>
										<DialogDescription className="flex items-center justify-center py-10">
											<div className="border border-muted p-4 rounded-md">
												<QRCode
													value="https://iksu.academy"
													className="w-32 h-32"
												/>
											</div>
										</DialogDescription>
									</DialogHeader>
								</DialogContent>
							</Dialog>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}
