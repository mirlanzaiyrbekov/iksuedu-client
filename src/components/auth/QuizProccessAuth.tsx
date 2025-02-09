import { IDefendand, IQuiz } from '@/interfaces/quiz.interface'
import { Loader2 } from 'lucide-react'
import { Dispatch, FC, SetStateAction } from 'react'

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
import { defendantService } from '@/services/defendant.service'
import { defendantScheme } from '@/services/scheme/defendant.scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { SendHorizonal } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface IQuizProccessAuthProps {
	data: IQuiz
	setAccess: Dispatch<SetStateAction<boolean>>
	setDefendantId: Dispatch<SetStateAction<string>>
}
export const QuizProccessAuth: FC<IQuizProccessAuthProps> = ({
	data,
	setAccess,
	setDefendantId,
}) => {
	const { isPending, mutateAsync } = useMutation({
		mutationKey: ['registerDefendant'],
		mutationFn: (
			data: Pick<IDefendand, 'firstName' | 'lastName' | 'email' | 'school'>
		) => defendantService.registerDefendant(data),
		onSuccess(response) {
			toast({
				title: response?.data?.message,
			})
			setAccess(true)
			setDefendantId(response.data.data)
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
		<div className="flex flex-col items-center mobile-xs:p-2 mobile-sm:p-4 mobile-md:p-6">
			<div className="flex flex-col items-center gap-3">
				<span className="text-sky-900 font-medium mobile-xs:my-5">
					<q>{data.title}</q>
				</span>
			</div>

			<div className="w-full tablet-md:max-w-sm">
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
									<FormLabel className="mobile-xs:text-xs tablet-md:text-sm">
										Имя
									</FormLabel>
									<FormControl>
										<Input
											className="rounded-lg placeholder:mobile-xs:text-xs placeholder:tablet-md:text-sm"
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
									<FormLabel className="mobile-xs:text-xs tablet-md:text-sm">
										Фамилия
									</FormLabel>
									<FormControl>
										<Input
											className="rounded-lg placeholder:mobile-xs:text-xs placeholder:tablet-md:text-sm"
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
									<FormLabel className="mobile-xs:text-xs tablet-md:text-sm">
										Учебное заведение
									</FormLabel>
									<FormControl>
										<Input
											className="rounded-lg placeholder:mobile-xs:text-xs placeholder:tablet-md:text-sm"
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
									<FormLabel className="mobile-xs:text-xs tablet-md:text-sm">
										E-mail
									</FormLabel>
									<FormControl>
										<Input
											className="rounded-lg placeholder:mobile-xs:text-xs placeholder:tablet-md:text-sm"
											placeholder="E-mail: example@gmail.com"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-xs " />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-full my-2 rounded-xl mobile-xs:text-xs tablet-md:text-sm"
						>
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
