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
import { Check, CircleHelp, X } from 'lucide-react'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Navigate, useParams } from 'react-router-dom'

export const QuizProcessPage = () => {
	const [access, setAccess] = React.useState(false)
	const [answers, setAnswers] = React.useState<Record<string, string>>({})
	const [results, setResults] = React.useState<IQuizResponse>()

	const { url } = useParams<{ url: string }>()

	const { isPending, mutateAsync } = useMutation({
		mutationKey: ['quizResults'],
		mutationFn: (data: any) => quizService.quizResults(data),
		onSuccess(response) {
			toast({
				title: 'Тест завершен',
			})
			setResults(response.data)
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
			await mutateAsync({ quizId: data?.id, answers })
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
				<QuizProccessAuth data={data} setAccess={setAccess} />
			) : (
				<div className="flex items-center justify-center p-10">
					<div className="max-w-2xl border rounded-md p-5 w-full flex items-center flex-col gap-4">
						{results?.success ? (
							<div className="flex items-center justify-center p-2">
								<ul className="flex flex-col gap-2">
									<li className="flex items-center gap-2">
										<small>Правильных ответов:</small>
										<span>{results?.correctAnswers}</span>
									</li>
									<li className="flex items-center gap-2">
										<small>Процент точности:</small>
										<span>{Math.round(results?.score)}%</span>
									</li>
									<li className="flex items-center gap-2">
										<small>Всего вопросов:</small>
										<span>{results?.totalQuestions}</span>
									</li>
								</ul>
							</div>
						) : null}
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
										<span className="flex items-center gap-2">
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
							Отправить
						</Button>
					</div>
				</div>
			)}
		</>
	) : (
		<Navigate to={'/notfound'} />
	)
}
