import React from 'react'

import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SINGLE_QUIZ } from '@/constants/request.keys.constants'
import { toast } from '@/hooks/use-toast'
import { useConfirm } from '@/hooks/useConfirm'
import { IQuizForm } from '@/interfaces/form.interface'
import { quizService } from '@/services/quiz.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { Control, useFieldArray, useFormContext } from 'react-hook-form'
import { DeleteButton } from '../delete.button'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

export const AnswerForm: React.FC<{
	control: Control<IQuizForm>
	questionIndex: number
	formType: 'CREATE' | 'UPDATE'
}> = ({ control, questionIndex, formType }) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: `questions.${questionIndex}.answers`,
	})

	const { setValue, watch } = useFormContext<IQuizForm>()
	const { action } = useConfirm()
	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationKey: ['deleteAnswer'],
		mutationFn: (id?: string) => quizService.deleteAnswer(id),
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
		switch (formType) {
			case 'CREATE':
				return remove(questionIndex)
			case 'UPDATE':
				return action({
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
	}

	return (
		<div className="flex flex-col gap-8">
			{fields.map((answer, answerIndex) => {
				const isChecked = watch(
					`questions.${questionIndex}.answers.${answerIndex}.isCorrect`
				)
				return (
					<div className="flex flex-col gap-2.5" key={answer.id}>
						<div className="flex items-center space-x-2">
							<Checkbox
								checked={isChecked}
								id={`term-${questionIndex}-${answerIndex}`}
								onCheckedChange={(checked: boolean) =>
									setValue(
										`questions.${questionIndex}.answers.${answerIndex}.isCorrect`,
										checked
									)
								}
							/>
							<Label htmlFor={`term-${questionIndex}-${answerIndex}`}>
								Правильный ответ
							</Label>
						</div>
						<div className="flex gap-1.5">
							<FormField
								control={control}
								name={`questions.${questionIndex}.answers.${answerIndex}.content`}
								render={({ field }) => (
									<FormItem className="grow">
										<FormControl>
											<Input
												placeholder={`Ответ №${answerIndex + 1}`}
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<DeleteButton
								onClick={() => deleteHandle(answer.customId, answerIndex)}
							>
								Удалить ответ
							</DeleteButton>
						</div>
					</div>
				)
			})}

			<div className="my-2">
				<Button
					size={'sm'}
					type="button"
					onClick={() => append({ content: '', isCorrect: false })}
				>
					<Plus /> Добавить ответ
				</Button>
			</div>
		</div>
	)
}
