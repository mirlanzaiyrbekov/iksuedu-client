import { IQuizResponse } from '@/interfaces/api.response.interface'
import { Ban, CircleCheck } from 'lucide-react'
import React from 'react'

interface IQuizResultsProps {
	results: IQuizResponse
}
export const QuizResults: React.FC<IQuizResultsProps> = ({ results }) => {
	return (
		<>
			{results?.success ? (
				<div className="rounded-md flex items-center justify-center p-3 border">
					<ul className="gap-4 mobile-xs:grid mobile-xs:grid-cols-1 tablet-sm:grid-cols-2 tablet-lg:flex tablet-lg:items-center">
						<li className="flex items-center gap-2">
							<small className="text-xs font-medium">Правильных ответов:</small>
							<span className="text-sm font-medium text-sky-800">
								{results?.correctAnswers}
							</span>
						</li>
						<li className="flex items-center gap-2">
							<small className="text-xs font-medium">Ваш бал:</small>
							<span className="text-sm font-medium text-sky-800">
								{Math.round(results?.score)}%
							</span>
						</li>
						<li className="flex items-center gap-2">
							<small className="text-xs font-medium">Проходной порог:</small>
							<span className="text-sm font-medium text-sky-800">
								{results?.passedScore}%
							</span>
						</li>
						<li className="flex items-center gap-2">
							<small className="text-xs font-medium">Всего вопросов:</small>
							<span className="text-sm font-medium text-sky-800">
								{results?.totalQuestions}
							</span>
						</li>
						<li className="flex items-center gap-2 tablet-sm:col-span-2 laptop-md:col-span-1">
							<small className="text-xs font-medium">Результаты теста:</small>
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
		</>
	)
}
