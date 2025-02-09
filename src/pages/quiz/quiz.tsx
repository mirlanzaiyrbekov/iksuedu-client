import { CopyClipBoard } from '@/components/copy.button'
import { DefendantLists } from '@/components/defenants.list'
import { DeleteButton } from '@/components/delete.button'
import { LoaderComponent } from '@/components/loader'
import { NavigationComponent } from '@/components/navigation/Navigation'
import { QrCodeComponent } from '@/components/qrCode'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { QUIZ_UNIQUE_URL } from '@/constants/app.constants'
import { ALL_QUIZ } from '@/constants/request.keys.constants'
import { formatDate } from '@/helpers/formate-date'
import { useFetchQuiz } from '@/hooks/fetch-quiz'
import { toast } from '@/hooks/use-toast'
import { useUser } from '@/hooks/use-user'
import { useConfirm } from '@/hooks/useConfirm'
import { quizService } from '@/services/quiz.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
	Calendar,
	CalendarCheck,
	ChartLine,
	FolderPen,
	Pencil,
	Percent,
	ShieldAlert,
	SquareArrowOutUpRight,
	UserRound,
	UserRoundCheck,
	UserRoundX,
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

export const QuizPage = () => {
	const { id } = useParams<{ id: string }>()
	const { user } = useUser()
	const { action } = useConfirm()
	const navigate = useNavigate()
	const { isLoading, data } = useFetchQuiz(id)

	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationKey: ['deleteQuiz'],
		mutationFn: (id?: string) => quizService.deleteQuiz(id),
		onSuccess(response) {
			toast({
				title: response?.data?.message || 'Удалено успешно',
			})
			queryClient.invalidateQueries({ queryKey: [ALL_QUIZ] })
			setTimeout(() => navigate('/'), 300)
		},
		onError(error: any) {
			toast({
				title:
					error?.response?.data?.message ||
					error.message ||
					'Ошибка при удалении',
			})
		},
	})

	const deleteHandle = () => {
		action({
			handleConfirm: async () => {
				try {
					await mutateAsync(data?.id)
				} catch (error) {
					toast({
						title: String(error) || 'Ошибка при обновлении',
					})
				}
			},
		})
	}

	return isLoading ? (
		<LoaderComponent />
	) : data ? (
		<>
			<Helmet>
				<title>Тест - {data.title}</title>
			</Helmet>
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
						<span className="font-medium">{data?.title}</span>
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
							Статистика
						</span>
						<ul className="flex flex-col gap-1.5">
							<li className="flex items-center justify-between">
								<small className="text-xs text-sky-600">сдавших:</small>
								<span className="text-sm flex items-center gap-2 font-medium">
									{data.passed}
									<UserRoundCheck size={14} />
								</span>
							</li>
							<li className="flex items-center justify-between">
								<small className="text-xs text-sky-600">Не сдавших:</small>
								<span className="text-sm flex items-center gap-2 font-medium">
									{data.didNotPass}
									<UserRoundX size={14} />
								</span>
							</li>
							<li className="flex items-center justify-between">
								<small className="text-xs text-sky-600">
									Общее число сдавших:
								</small>
								<span className="text-sm flex items-center gap-2 font-medium">
									{data.defendants.length}
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
							<li className="flex items-center justify-between">
								<small className="text-xs text-sky-600">Проходной бал:</small>
								<span className="text-sm flex items-center gap-2 font-medium">
									{data.passedScore}
									<Percent size={14} />
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
							<QrCodeComponent
								expire={data.expires}
								url={`${QUIZ_UNIQUE_URL}/quiz/testing/${data.url}`}
							/>
							<CopyClipBoard
								expire={data.expires}
								content={`${QUIZ_UNIQUE_URL}/quiz/testing/${data.url}`}
							/>
						</div>
					</div>
					<div className="flex flex-col gap-5 border rounded-md p-2">
						<span className="text-sm font-medium flex items-center gap-1.5">
							<ShieldAlert size={14} />
							Действия
						</span>
						<div className="flex items-center gap-2 justify-center">
							<Button
								size={'sm'}
								variant={'outline'}
								onClick={() => navigate(`/quiz/update/${data.id}`)}
							>
								<Pencil />
								Редактировать
							</Button>
							<DeleteButton onClick={deleteHandle}>Удалить</DeleteButton>
						</div>
					</div>
				</div>
			</section>
			{/* DEFENDANT DETAIL LIST */}
			<DefendantLists data={data} />
		</>
	) : (
		<Navigate to={'/notfound'} />
	)
}
