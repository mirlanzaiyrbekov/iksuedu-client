import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SINGLE_QUIZ } from '@/constants/request.keys.constants'
import { toast } from '@/hooks/use-toast'
import { useConfirm } from '@/hooks/useConfirm'
import { IQuestionFormProps } from '@/interfaces/form.interface'
import { quizService } from '@/services/quiz.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import React from 'react'
import { DeleteButton } from '../delete.button'
import { Button } from '../ui/button'
import { AnswerForm } from './answerForm'

export const QuestionForm: React.FC<IQuestionFormProps> = ({
	append,
	control,
	questions,
	remove,
}) => {
	const queryClient = useQueryClient()
	const { action } = useConfirm()
	const { mutateAsync } = useMutation({
		mutationKey: ['deleteQuestion'],
		mutationFn: (id?: string) => quizService.deleteQuestion(id),
		onSuccess(response) {
			toast({
				title: response?.data?.message || 'Обновление успешно',
			})
			queryClient.invalidateQueries({ queryKey: [SINGLE_QUIZ] })
		},
		onError(error: any) {
			toast({
				title:
					error?.response?.data?.message ||
					error.message ||
					'Ошибка при обновлении',
			})
		},
	})

	const deleteHandle = (id?: string, questionIndex?: number) => {
		action({
			handleConfirm: async () => {
				try {
					await mutateAsync(id)
					remove(questionIndex)
				} catch (error) {
					toast({
						title: `${String(error)}`,
					})
				}
			},
		})
	}

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

								<DeleteButton
									onClick={() => deleteHandle(question.customId, questionIndex)}
								>
									Удалить вопрос
								</DeleteButton>
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
