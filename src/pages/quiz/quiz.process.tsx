import { QuizProccessAuth } from '@/components/auth/QuizProccessAuth'
import { LoaderComponent } from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { SINGLE_QUIZ_URL } from '@/constants/request.keys.constants'
import { toast } from '@/hooks/use-toast'
import { IQuizResponse } from '@/interfaces/api.response.interface'
import { quizService } from '@/services/quiz.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
	Ban,
	Check,
	CircleCheck,
	CircleHelp,
	SendHorizonal,
	X,
} from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Navigate, useParams } from 'react-router-dom'

export const QuizProcessPage = () => {
	const { url } = useParams<{ url: string }>()

	if (!url) return <Navigate to={'/notfound'} />

	const [defendantId, setDefendantId] = useState('')
	const [access, setAccess] = useState(false)
	const [answers, setAnswers] = useState<Record<string, string>>({})
	const [results, setResults] = useState<IQuizResponse>()

	const { isPending, mutateAsync } = useMutation({
		mutationKey: ['processQuiz'],
		mutationFn: (data: any) => quizService.processQuiz(data),
		onSuccess(response) {
			toast({
				title: 'Тест завершен',
			})
			setResults(response.data)
			window.scrollTo({ top: 0, behavior: 'smooth' })
		},
		onError: (error) => {
			toast({
				title: `Ошибка: ${String(error)}`,
			})
		},
	})

	const { isLoading, data } = useQuery({
		queryKey: [SINGLE_QUIZ_URL],
		queryFn: () => quizService.fetchQuizByUrl(url),
		select: (data) => data.data,
	})

	const onValueChangeHandle = (questionId: string, answerId: string) => {
		setAnswers((prev) => ({
			...prev,
			[questionId]: answerId,
		}))
	}

	const submitAnswers = async () => {
		try {
			console.log(answers)
			await mutateAsync({
				quizId: data?.id,
				answers,
				defendantId,
			})
		} catch (error) {
			console.error('Ошибка отправки', error)
			alert('Ошибка при отправке ответов!')
		}
	}

	return isLoading ? (
		<LoaderComponent />
	) : data ? (
		<>
			<Helmet>
				<title>Добро пожаловать на {data.title}</title>
			</Helmet>
			{!access ? (
				<QuizProccessAuth
					setDefendantId={setDefendantId}
					data={data}
					setAccess={setAccess}
				/>
			) : (
				<div className="flex flex-col items-center gap-2 p-10">
					{results?.success ? (
						<div className="rounded-md flex items-center justify-center p-3 bg-muted/80">
							<ul className="flex items-center gap-4">
								<li className="flex items-center gap-2">
									<small className="text-xs text-sky-600">
										Правильных ответов:
									</small>
									<span className="text-sm">{results?.correctAnswers}</span>
								</li>
								<li className="flex items-center gap-2">
									<small className="text-xs text-sky-600">Ваш бал:</small>
									<span className="text-sm">{Math.round(results?.score)}%</span>
								</li>
								<li className="flex items-center gap-2">
									<small className="text-xs text-sky-600">Проходной бал:</small>
									<span className="text-sm">{results?.passedScore}%</span>
								</li>
								<li className="flex items-center gap-2">
									<small className="text-xs text-sky-600">
										Всего вопросов:
									</small>
									<span className="text-sm">{results?.totalQuestions}</span>
								</li>
								<li className="flex items-center gap-2">
									<small className="text-xs text-sky-600">
										Результаты теста:
									</small>
									{!results.passed ? (
										<span className="text-sm text-red-600 font-medium flex items-center gap-1.5">
											<Ban size={14} />
											Вы не прошли тестирование
										</span>
									) : (
										<span className="text-sm text-green-600 font-medium flex items-center gap-1.5">
											<CircleCheck size={14} />
											Вы успешно прошли тестирование
										</span>
									)}
								</li>
							</ul>
						</div>
					) : null}
					<div className="max-w-2xl border rounded-md p-5 w-full flex items-center flex-col gap-4">
						{data.questions.map((question, index) => (
							<ul
								key={question.id}
								className="border border-muted p-5 rounded-sm w-full"
							>
								<li className="flex flex-col gap-4">
									<div className="flex flex-col gap-4">
										<small className=" text-sky-600 text-xs">
											Вопрос №: {index + 1}
										</small>
										<span className="flex items-center gap-2 text-sm border p-2 rounded-md text-sky-900">
											<CircleHelp size={14} />
											{question.content}
										</span>
									</div>
									<div className="flex flex-col gap-2 border rounded-md p-2">
										<RadioGroup
											disabled={results?.success}
											onValueChange={(answerId) =>
												onValueChangeHandle(question.id, answerId)
											}
										>
											{question.answers.map((answer) => (
												<div
													key={answer.id}
													className="flex items-center gap-5"
												>
													<Label
														htmlFor={answer.id}
														className="text-sm cursor-pointer"
													>
														{answer.content}
													</Label>
													<RadioGroupItem value={answer.id} id={answer.id} />
													{results?.success ? (
														answer.isCorrect ? (
															<div className="text-green-400 text-xs flex items-center gap-1.5">
																<Check size={14} />
																Правильный
															</div>
														) : (
															<div className="text-red-400 text-xs flex items-center gap-1.5">
																<X size={14} />
																Не правильный
															</div>
														)
													) : null}
												</div>
											))}
										</RadioGroup>
									</div>
								</li>
							</ul>
						))}
						<Button
							disabled={isPending || results?.success}
							onClick={submitAnswers}
						>
							<SendHorizonal size={14} />
							Отправить ответы
						</Button>
					</div>
				</div>
			)}
		</>
	) : (
		<Navigate to={'/notfound'} />
	)
}
