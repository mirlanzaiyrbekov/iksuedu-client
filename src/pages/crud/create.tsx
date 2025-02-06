import { QuestionForm } from '@/components/form/questionForm'
import { SelectData } from '@/components/selectData'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { QUIZ_UNIQUE_URL } from '@/constants/app.constants'
import { ALL_QUIZ } from '@/constants/request.keys.constants'
import { toast } from '@/hooks/use-toast'
import { useUser } from '@/hooks/use-user'
import { IQuizForm } from '@/interfaces/form.interface'
import { quizService } from '@/services/quiz.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CopyPlus, Loader2, SaveAll } from 'lucide-react'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const CreateTestPage = () => {
	const [date, setDate] = React.useState<Date | undefined>()
	const { user } = useUser()
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const form = useForm<IQuizForm>({
		defaultValues: {
			title: '',
			questions: [
				{ content: '', answers: [{ content: '', isCorrect: false }] },
			],
		},
	})

	const { isPending, mutateAsync } = useMutation({
		mutationKey: ['CreateTest'],
		mutationFn: (data: IQuizForm) => quizService.createQuiz(data),
		onSuccess: ({ data }) => {
			toast({
				title: `${data.message}`,
			})
			queryClient.invalidateQueries({ queryKey: [ALL_QUIZ] })
			navigate(-1)
		},
		onError: (error) => {
			toast({
				title: `Ошибка: ${String(error)}`,
			})
		},
	})

	async function onSubmit(values: IQuizForm) {
		try {
			if (user && date) {
				await mutateAsync({
					title: values.title,
					teacherId: user.id,
					expires: date,
					urlAddress: `${QUIZ_UNIQUE_URL}/quiz/testing`,
					questions: values.questions,
				})
			} else {
				toast({
					title: 'Ошибка добавления',
				})
			}
		} catch (error) {
			toast({
				title: `${String(error)}`,
			})
		}
	}

	const {
		fields: questions,
		append,
		remove,
	} = useFieldArray({
		control: form.control,
		name: 'questions',
	})

	return (
		<>
			<Helmet>
				<title>Создать тест</title>
			</Helmet>
			<div className="flex items-center justify-center py-10">
				<div className="flex flex-col gap-8 max-w-xl w-full border rounded-md p-2">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col gap-3"
						>
							<span className="flex items-center gap-2 text-sky-600 font-bold text-sm">
								<CopyPlus size={16} />
								Создать тест
							</span>
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem className="relative">
										<FormLabel className="text-xs">Название теста</FormLabel>
										<FormControl>
											<Input placeholder="Название теста" {...field} />
										</FormControl>
										<FormDescription className="hidden" />
										<FormMessage className="text-xs absolute -bottom-4 right-0" />
									</FormItem>
								)}
							/>
							<div className="flex items-center gap-1">
								<div className="flex flex-col gap-2.5">
									<span className="text-xs font-medium">Срок истечения</span>
									<SelectData date={date} setDate={setDate} />
								</div>
							</div>
							<QuestionForm
								control={form.control}
								questions={questions}
								append={append}
								remove={remove}
							/>
							<div className="pt-6">
								<Button type="submit" disabled={isPending}>
									{isPending ? (
										<Loader2 className="animate-spin" />
									) : (
										<SaveAll />
									)}
									Сохранить
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</>
	)
}
