import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { IQuestionFormProps } from '@/interfaces/form.interface'
import { Plus, Trash } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { AnswerForm } from './answerForm'

export const QuestionForm: React.FC<IQuestionFormProps> = ({
	append,
	control,
	questions,
	remove,
}) => {
	return (
		<div className="border rounded-md p-2">
			<span className="text-sky-600 block text-sm font-medium my-2">
				Вопрос теста
			</span>
			<div className="flex flex-col gap-3">
				{questions.map((question, questionIndex) => {
					return (
						<div
							key={question.id}
							className="flex flex-col gap-3 border p-2 rounded-md"
						>
							<div className="flex items-center gap-1.5">
								<FormField
									control={control}
									name={`questions.${questionIndex}.content`}
									render={({ field }) => (
										<FormItem className="relative grow">
											<FormControl>
												<Input
													placeholder={`Вопрос № ${questionIndex + 1}`}
													{...field}
												/>
											</FormControl>
											<FormMessage className="text-xs absolute -bottom-4 right-0" />
										</FormItem>
									)}
								/>
								<Button
									size={'sm'}
									type="button"
									onClick={() => remove(questionIndex)}
									variant={'destructive'}
								>
									<Trash /> Удалить вопрос
								</Button>
							</div>

							<AnswerForm control={control} questionIndex={questionIndex} />
						</div>
					)
				})}
			</div>

			<div className="my-2">
				<Button
					size={'sm'}
					type="button"
					onClick={() =>
						append({
							content: '',
							answers: [{ content: '', isCorrect: false }],
						})
					}
				>
					<Plus /> Добавить вопрос
				</Button>
			</div>
		</div>
	)
}
