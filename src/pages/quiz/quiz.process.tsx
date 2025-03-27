import { QuizProccessAuth } from '@/components/auth/QuizProccessAuth'
import { LoaderComponent } from '@/components/loader'
import { QuizResults } from '@/components/quiz.results'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { SINGLE_QUIZ_URL } from '@/constants/request.keys.constants'
import { toast } from '@/hooks/use-toast'
import { IQuizResponse } from '@/interfaces/api.response.interface'
import { quizService } from '@/services/quiz.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CircleHelp, SendHorizonal } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Navigate, useParams } from 'react-router-dom'

export const QuizProcessPage = () => {
	const { url } = useParams<{ url: string }>()

	const [defendantId, setDefendantId] = useState('')
	const [access, setAccess] = useState(false)
	const [answers, setAnswers] = useState<Record<string, string>>()
	const [results, setResults] = useState<IQuizResponse>()

	const { isLoading, data } = useQuery({
		queryKey: [SINGLE_QUIZ_URL],
		queryFn: () => quizService.fetchQuizByUrl(url),
		select: (data) => data.data,
	})

	const { isPending, mutateAsync } = useMutation({
		mutationKey: ['processQuiz'],
		mutationFn: quizService.processQuiz,
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

	const onValueChangeHandle = (questionId: string, answerId: string) => {
		setAnswers((prev) => ({
			...prev,
			[questionId]: answerId,
		}))
	}

	const submitAnswers = async () => {
		await mutateAsync({
			quizId: data?.id,
			answers,
			defendantId,
		})
	}

	// @ts-ignore
	if ((data && data.expire && !data?.expire) || !url)
		return <Navigate to={'/notfound'} />

	return isLoading ? (
		<LoaderComponent />
	) : data ? (
		<>
			<Helmet>
				<title>Добро пожаловать на {data.title}</title>
			</Helmet>
			{!access ? (
				<QuizProccessAuth
					setAccess={setAccess}
					data={data}
					setDefendantId={setDefendantId}
					defendantId={defendantId}
				/>
			) : (
				<div className="flex flex-col items-center gap-4 mobile-xs:px-0 mobile-xs:py-2">
					<q className="font-medium text-base">{data.title}</q>
					{results ? <QuizResults results={results} /> : null}
					<div className="border rounded-md w-full flex items-center flex-col gap-4 mobile-xs:w-full tablet-md:max-w-2xl tablet-md:p-5 mobile-xs:pb-3">
						{data.questions.map((question, index) => (
							<ul
								key={question.id}
								className="border border-muted rounded-sm w-full mobile-xs:p-2 tablet-md:p-5"
							>
								<li className="flex flex-col gap-4">
									<div className="flex flex-col gap-4">
										<small className=" text-sky-600 text-xs">
											Вопрос №: {index + 1}
										</small>
										<span className="flex items-center gap-2 text-sm border rounded-md text-sky-900 mobile-xs:p-2">
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
														className="cursor-pointer mobile-xs:text-xs tablet-md:text-sm"
													>
														{answer.content}
													</Label>
													<RadioGroupItem value={answer.id} id={answer.id} />
													{/* {results?.success ? (
												answer.isCorrect ? (
													<div className="text-green-400 text-xs flex items-center gap-1.5">
														<Check size={14} />
														Правильный
													</div>
												) : null
											) : null} */}
												</div>
											))}
										</RadioGroup>
									</div>
								</li>
							</ul>
						))}
						<Button
							className="mobile-xs:text-xs tablet-md:text-sm"
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
