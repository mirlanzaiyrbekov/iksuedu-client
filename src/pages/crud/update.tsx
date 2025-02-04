import { QuestionForm } from '@/components/form/questionForm'
import { LoaderComponent } from '@/components/loader'
import { NavigationComponent } from '@/components/navigation/Navigation'
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
import { useFetchQuiz } from '@/hooks/fetch-quiz'
import { toast } from '@/hooks/use-toast'
import { IQuizForm } from '@/interfaces/form.interface'
import { quizService } from '@/services/quiz.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CopyPlus, Loader2, SaveAll } from 'lucide-react'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useFieldArray, useForm } from 'react-hook-form'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

export const UpdateTestPage = () => {
	const { id } = useParams<{ id: string }>()
	const [date, setDate] = React.useState<Date | undefined>()
	const { data: quiz, isLoading } = useFetchQuiz(id)

	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const { isPending, mutateAsync } = useMutation({
		mutationKey: ['updateQuiz'],
		mutationFn: (data: IQuizForm) => quizService.updateQuiz(data),
		onSuccess(response) {
			toast({
				title: response?.data?.message || 'Обновление успешно',
			})
			queryClient.invalidateQueries({ queryKey: ['getQuiz', quiz?.id] })
			setTimeout(() => navigate(-1), 500)
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

	const form = useForm<IQuizForm>({
		defaultValues: {
			title: '',
			questions: [],
			expires: undefined,
		},
	})

	async function onSubmit(values: IQuizForm) {
		try {
			await mutateAsync({
				...values,
				expires: date,
			})
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

	React.useEffect(() => {
		if (quiz && quiz.expires) {
			form.reset(quiz)
			setDate(quiz.expires)
		}
	}, [quiz, form])

	return isLoading ? (
		<LoaderComponent />
	) : quiz ? (
		<>
			<Helmet>
				<title>Обновить запись - {quiz?.title}</title>
			</Helmet>

			<NavigationComponent
				links={[
					{
						name: `${quiz.title}`,
						url: `/quiz/${quiz.id}`,
					},
					{
						name: `Редактировать - ${quiz.title}`,
						url: `/quiz/update/${quiz.id}`,
					},
				]}
			/>
			<div className="flex items-center justify-center py-10">
				<div className="flex flex-col gap-8 max-w-xl w-full border rounded-md p-2">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col gap-3"
						>
							<span className="flex items-center gap-2 text-sky-600 font-bold text-sm">
								<CopyPlus size={16} />
								Обновить тест
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
	) : (
		<Navigate to={'/notfound'} />
	)
}
