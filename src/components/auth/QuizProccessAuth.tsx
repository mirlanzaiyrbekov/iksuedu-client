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
import { useAttemp } from '@/hooks/use-attemp'
import { toast } from '@/hooks/use-toast'
import { IQuiz } from '@/interfaces/quiz.interface'
import { defendantService } from '@/services/defendant.service'
import { defendantScheme } from '@/services/scheme/defendant.scheme'
import { DefendatTypeRegister } from '@/types/form.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Dispatch, FC, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

interface IQuizProccessAuthProps {
	data: IQuiz
	setDefendantId: Dispatch<SetStateAction<string>>
	setAccess: Dispatch<SetStateAction<boolean>>
	defendantId: string
}
export const QuizProccessAuth: FC<IQuizProccessAuthProps> = ({
	data,
	setDefendantId,
	setAccess,
	defendantId,
}) => {
	const { attemp } = useAttemp()
	const { isPending, mutateAsync } = useMutation({
		mutationKey: ['registerDefendant'],
		mutationFn: defendantService.registerDefendant,
		onSuccess(response) {
			toast({
				title: response?.data?.message,
			})
			setDefendantId(response.data.data)
			if (response.data.success) {
				setAccess(response.data.success)
			}
		},
		onError(error: any) {
			toast({
				title:
					error?.response?.data?.message ||
					error.message ||
					'Произошла ошибка. Повторите попытку позже',
			})
		},
	})

	const form = useForm<DefendatTypeRegister>({
		resolver: zodResolver(defendantScheme),
		defaultValues: {
			fullName: '',
			email: '',
			school: '',
		},
	})

	async function onSubmit(values: DefendatTypeRegister) {
		try {
			await mutateAsync({
				...values,
				testId: data.id,
				attempt: {
					...attemp,
					defendantId,
				},
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
							name="fullName"
							render={({ field }) => (
								<FormItem className="relative">
									<FormLabel className="mobile-xs:text-xs tablet-md:text-sm">
										Полное имя
									</FormLabel>
									<FormControl>
										<Input
											className="rounded-lg placeholder:mobile-xs:text-xs placeholder:tablet-md:text-sm"
											placeholder="Пример: Имя Фамилия"
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
										Email
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Email"
											className="rounded-lg placeholder:mobile-xs:text-xs placeholder:tablet-md:text-sm"
										/>
									</FormControl>
									<FormMessage className="text-xs" />
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
								<ArrowRight />
							)}
							К тесту
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}
