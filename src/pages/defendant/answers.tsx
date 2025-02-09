import { LoaderComponent } from '@/components/loader'
import { NavigationComponent } from '@/components/navigation/Navigation'
import { Separator } from '@/components/ui/separator'
import {
	DEFENDANT_ALL_ANSWERS,
	DEFENDANT_BY_ID,
} from '@/constants/request.keys.constants'
import { formatDate } from '@/helpers/formate-date'
import { useFetchQuiz } from '@/hooks/fetch-quiz'
import { defendantService } from '@/services/defendant.service'
import { useQuery } from '@tanstack/react-query'
import { Check, CircleHelp, UserRound, X } from 'lucide-react'
import { Navigate, useParams } from 'react-router-dom'

export const DefendantAnswersPage = () => {
	const { quizId, defendantId } = useParams<{
		quizId: string
		defendantId: string
	}>()

	const { data: quiz } = useFetchQuiz(quizId)

	const { isLoading, data } = useQuery({
		queryKey: [DEFENDANT_ALL_ANSWERS],
		queryFn: () =>
			defendantService.fetchAnswers(String(quizId), String(defendantId)),
		select: (data) => data.data,
	})

	const { data: defendant } = useQuery({
		queryKey: [DEFENDANT_BY_ID],
		queryFn: () => defendantService.fetchDefendantById(String(defendantId)),
		select: (data) => data.data,
	})

	return isLoading ? (
		<LoaderComponent />
	) : data && quiz ? (
		<>
			<NavigationComponent
				links={[
					{
						name: `${quiz.title}`,
						url: `/quiz/${quiz.id}`,
					},
					{
						name: `Просмотр статистики - ${quiz.title}`,
						url: `/defendant/answers/${quizId}/${defendantId}`,
					},
				]}
			/>
			<section>
				<div className="my-3">
					<div className="flex flex-col gap-2 p-5">
						<div className="flex items-center justify-between">
							<ul className="flex items-center gap-2">
								<li className="flex items-center gap-1.5">
									<small className="text-xs text-sky-600">Проходной бал:</small>
									<span className="text-sm">{quiz.passedScore}%</span>
								</li>

								<li className="flex items-center gap-1.5">
									<small className="text-xs text-sky-600">Набранный бал:</small>
									<span className="text-sm">{defendant?.score}%</span>
								</li>
								<li className="flex items-center gap-1.5">
									<small className="text-xs text-sky-600">Статус:</small>
									{!defendant?.passed ? (
										<small className="text-red-600 text-xs font-medium">
											Не прошел
										</small>
									) : (
										<small className="text-green-600 text-xs font-medium">
											Прошел
										</small>
									)}
								</li>
							</ul>
							<ul>
								<li className="flex items-center gap-1.5">
									<small className="text-xs text-sky-600">Актуален до:</small>
									<span className="text-sm">{formatDate(quiz.expires)}</span>
								</li>
							</ul>
						</div>
						<Separator className="my-2" />
						<h4 className="text-sm font-medium my-2">Ответы студента:</h4>
						<ul className="grid grid-cols-2 gap-2">
							{data.map((answer) => (
								<li key={answer.id}>
									<div className="flex items-center gap-2">
										<small className="text-xs text-sky-600">
											<CircleHelp size={16} />
										</small>
										<span className="text-sm font-medium">
											{answer.question.content}
										</span>
									</div>
									<div className="flex flex-col gap-2 my-3">
										<div className="flex items-center gap-1.5">
											<small className="text-xs text-sky-600 flex items-center gap-2">
												<UserRound size={14} />
												Выбор пользователя:
											</small>
											<span
												className={
													answer.answer.isCorrect
														? 'text-green-600 text-xs font-medium'
														: 'text-red-600 text-xs font-medium'
												}
											>
												{answer.answer.content}
											</span>
										</div>
										<div className="flex flex-col gap-2 border p-3 rounded-md">
											{answer.question.answers?.map((a) => (
												<div className="flex items-center gap-2">
													<span key={a.id} className="text-xs">
														{a.content}
													</span>
													<small className="text-xs">
														{!a.isCorrect ? (
															<X size={14} className="text-red-600" />
														) : (
															<Check size={14} className="text-green-600" />
														)}
													</small>
												</div>
											))}
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>
		</>
	) : (
		<Navigate to={'/notfound'} />
	)
}
