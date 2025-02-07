import { IDefendand, IQuiz } from '@/interfaces/quiz.interface'
import { BookCheck, Loader2 } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { quizService } from '@/services/quiz.service'
import { defendantScheme } from '@/services/scheme/defendant.scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { SendHorizonal } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface IQuizProccessAuthProps {
	data: IQuiz
	setAccess: React.Dispatch<React.SetStateAction<boolean>>
}
export const QuizProccessAuth: React.FC<IQuizProccessAuthProps> = ({
	data,
	setAccess,
}) => {
	const { isPending, mutateAsync } = useMutation({
		mutationKey: ['registerDefendant'],
		mutationFn: (
			data: Pick<IDefendand, 'firstName' | 'lastName' | 'email' | 'school'>
		) => quizService.registerDefendant(data),
		onSuccess(response) {
			toast({
				title: response?.data?.message,
			})
			setAccess(true)
		},
		onError(error: any) {
			toast({
				title:
					error?.response?.data?.message ||
					error.message ||
					'Произошла ошибка. Повторите попытку позже',
			})
			setAccess(false)
		},
	})

	const form = useForm<z.infer<typeof defendantScheme>>({
		resolver: zodResolver(defendantScheme),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			school: '',
		},
	})

	async function onSubmit(values: z.infer<typeof defendantScheme>) {
		try {
			await mutateAsync({
				...values,
				// @ts-ignore
				testId: data.id,
			})
		} catch (error) {
			toast({
				title:
					`${String(error)}` || 'Произошла ошибка. Повторите попытку позже',
			})
		}
	}

	return (
		<div className="flex flex-col items-center py-8">
			<div className="max-w-md w-full flex flex-col items-center gap-3">
				<h2 className="flex items-center gap-2 text-sky-600 font-medium">
					<BookCheck size={16} />
					Добро пожаловать на тестирование
				</h2>
				<span>
					<q>{data.title}</q>
				</span>
			</div>

			<div className="max-w-sm  w-full">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-3 w-full"
					>
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem className="relative">
									<FormLabel>Имя</FormLabel>
									<FormControl>
										<Input
											className="rounded-lg"
											placeholder="Ваше имя"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-xs " />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={'lastName'}
							render={({ field }) => (
								<FormItem className="relative">
									<FormLabel>Фамилия</FormLabel>
									<FormControl>
										<Input
											className="rounded-lg"
											placeholder="Фамилия"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-xs " />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={'school'}
							render={({ field }) => (
								<FormItem className="relative">
									<FormLabel>Учебное заведение</FormLabel>
									<FormControl>
										<Input
											className="rounded-lg"
											placeholder="Учебное заведение"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-xs " />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="relative">
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input
											className="rounded-lg"
											placeholder="E-mail: example@gmail.com"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-xs " />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full my-2 rounded-xl">
							{isPending ? (
								<Loader2 className="animate-spin" />
							) : (
								<SendHorizonal />
							)}
							Пройти тест
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}
