import React from 'react'

import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { IQuizForm } from '@/interfaces/form.interface'
import { Plus, Trash } from 'lucide-react'
import { Control, useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

export const AnswerForm: React.FC<{
	control: Control<IQuizForm>
	questionIndex: number
}> = ({ control, questionIndex }) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: `questions.${questionIndex}.answers`,
	})

	const { setValue, watch } = useFormContext<IQuizForm>()

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
								id={`term-${answerIndex}`}
								onCheckedChange={(checked: boolean) =>
									setValue(
										`questions.${questionIndex}.answers.${answerIndex}.isCorrect`,
										checked
									)
								}
							/>
							<Label htmlFor={`term-${answerIndex}`}>Правильный ответ</Label>
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
							<Button
								size={'sm'}
								type="button"
								onClick={() => remove(answerIndex)}
								variant="destructive"
							>
								<Trash /> Удалить ответ
							</Button>
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
