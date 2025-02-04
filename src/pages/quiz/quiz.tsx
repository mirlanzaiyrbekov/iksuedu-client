import { LoaderComponent } from '@/components/loader'
import { NavigationComponent } from '@/components/navigation/Navigation'
import { QrCodeComponent } from '@/components/qrCode'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/helpers/formate-date'
import { useUser } from '@/hooks/use-user'
import { quizService } from '@/services/quiz.service'
import { useQuery } from '@tanstack/react-query'
import {
	Calendar,
	CalendarCheck,
	ChartLine,
	FolderPen,
	LinkIcon,
	Pencil,
	ShieldAlert,
	SquareArrowOutUpRight,
	Trash,
	UserRound,
	UserRoundCheck,
	UserRoundX,
} from 'lucide-react'
import { Navigate, useParams } from 'react-router-dom'

export const QuizPage = () => {
	const { id } = useParams<{ id: string }>()
	const { user } = useUser()
	const { data, isLoading } = useQuery({
		queryKey: ['getQuiz', id],
		queryFn: () => quizService.fetchQuizById(String(id)),
		select: ({ data }) => data,
		enabled: !!id,
	})

	return isLoading ? (
		<LoaderComponent />
	) : data ? (
		<>
			<NavigationComponent
				links={[{ url: `/quiz/${data.id}`, name: data.title }]}
			/>
			<section>
				<div className="flex justify-between items-end py-4">
					<div className="flex flex-col gap-2">
						<small className="text-xs text-sky-600 flex items-center gap-1.5">
							<FolderPen size={16} />
							Название теста
						</small>
						<span className="font-bold">{data?.title}</span>
					</div>
					<ul className="flex flex-col gap-1 items-end">
						<li className="flex items-center gap-2">
							<small className="text-xs text-sky-600 flex items-center gap-1.5">
								<Calendar size={14} />
								Дата создания:
							</small>
							<span className="text-sm">{formatDate(data.createdAt)}</span>
						</li>
					</ul>
				</div>
				<Separator />
			</section>
			<section>
				<div className="grid grid-cols-4 gap-5 mt-4">
					<div className="flex flex-col gap-5 border rounded-md p-2">
						<span className="text-sm font-medium flex items-center gap-1.5">
							<ChartLine size={14} />
							Сатистика
						</span>
						<ul className="flex flex-col gap-1.5">
							<li className="flex items-center justify-between">
								<small className="text-xs text-sky-600">Сдавщих:</small>
								<span className="text-sm flex items-center gap-2 font-medium">
									102
									<UserRoundCheck size={14} />
								</span>
							</li>
							<li className="flex items-center justify-between">
								<small className="text-xs text-sky-600">Не сдавщих:</small>
								<span className="text-sm flex items-center gap-2 font-medium">
									30
									<UserRoundX size={14} />
								</span>
							</li>
							<li className="flex items-center justify-between">
								<small className="text-xs text-sky-600">
									Общее число сдавщих:
								</small>
								<span className="text-sm flex items-center gap-2 font-medium">
									132
									<UserRoundCheck size={14} />
								</span>
							</li>
						</ul>
					</div>

					<div className="flex flex-col gap-5 border rounded-md p-2">
						<span className="text-sm font-medium flex items-center gap-1.5">
							<ChartLine size={14} />
							Информация
						</span>
						<ul className="flex flex-col gap-1.5">
							<li className="flex items-center justify-between">
								<small className="text-xs text-sky-600">Создал:</small>
								<span className="text-sm flex items-center gap-2 font-medium">
									{user?.firstName}
									<UserRound size={14} />
								</span>
							</li>
							<li className="flex items-center justify-between">
								<small className="text-xs text-sky-600">Активен до:</small>
								<span className="text-sm flex items-center gap-2 font-medium">
									{formatDate(data.expires)}
									<CalendarCheck size={14} />
								</span>
							</li>
						</ul>
					</div>
					<div className="flex flex-col gap-5 border rounded-md p-2">
						<span className="text-sm font-medium flex items-center gap-1.5">
							<SquareArrowOutUpRight size={14} />
							Ссылка
						</span>
						<div className="flex items-center gap-2 justify-center">
							<QrCodeComponent />
							<Button variant={'outline'} size={'sm'}>
								<LinkIcon />
								Скопировать ссылку
							</Button>
						</div>
					</div>
					<div className="flex flex-col gap-5 border rounded-md p-2">
						<span className="text-sm font-medium flex items-center gap-1.5">
							<ShieldAlert size={14} />
							Действия
						</span>
						<div className="flex items-center gap-2 justify-center">
							<Button size={'sm'} variant={'outline'}>
								<Pencil />
								Редактировать
							</Button>
							<Button size={'sm'} variant={'outline'}>
								<Trash />
								Удалить
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	) : (
		<Navigate to={'notfound'} />
	)
}
