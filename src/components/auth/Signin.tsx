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
import { AuthEnum } from '@/enum/auth.enum'
import { saveToStorage } from '@/helpers/storage.helpers'
import { toast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/useAuth'
import { IAuthProps } from '@/pages/auth'
import { authService } from '@/services/auth.service'
import { signInScheme } from '@/services/scheme/auth.scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import {
	Eye,
	EyeOff,
	Loader2,
	SendHorizonal,
	UserRoundCheck,
	UserRoundPlus,
} from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '../ui/button'

export const SignIn: React.FC<IAuthProps> = ({ authChoice }) => {
	const [inputType, setInputType] = React.useState<boolean>(true)
	const navigate = useNavigate()
	const { setAuthHandle } = useAuth()
	const { isPending, mutateAsync } = useMutation({
		mutationKey: ['loginUser'],
		mutationFn: (data: z.infer<typeof signInScheme>) =>
			authService.signIn(data),
	})

	const form = useForm<z.infer<typeof signInScheme>>({
		resolver: zodResolver(signInScheme),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	async function onSubmit(values: z.infer<typeof signInScheme>) {
		try {
			await mutateAsync(values, {
				onSuccess({ data }) {
					toast({
						title: data.message,
					})
					saveToStorage(AuthEnum.IS_AUTHENTIFICATION, 'true')
					saveToStorage(AuthEnum.ACCESS_TOKEN, data.access_token)
					setAuthHandle()
					setTimeout(() => navigate('/'), 500)
				},
			})
		} catch (error) {
			toast({
				title: 'Ошибка.',
				description: `${String(error)}`,
			})
		}
	}
	return (
		<div className="flex flex-col gap-4 items-center py-10 max-w-sm mobile-xs:px-4 w-full">
			<h4 className="mobile-xs:text-lg tablet-sm:text-xl font-medium text-primary/90 flex items-center gap-1.5">
				<UserRoundCheck size={18} />
				Войти в систему
			</h4>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-3 w-full"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="relative">
								<FormLabel>E-mail</FormLabel>
								<FormControl>
									<Input placeholder="E-mail: example@gmail.com" {...field} />
								</FormControl>
								<FormDescription className="hidden" />
								<FormMessage className="text-xs" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={'password'}
						render={({ field }) => (
							<FormItem className="relative">
								<FormLabel>Пароль</FormLabel>
								<FormControl>
									<Input
										placeholder="Пароль"
										{...field}
										type={`${!inputType ? 'text' : 'password'}`}
									/>
								</FormControl>
								<div
									className="absolute right-0 top-1/2 -translate-x-1/2 cursor-pointer"
									onClick={() => setInputType(!inputType)}
								>
									{!inputType ? <Eye size={16} /> : <EyeOff size={16} />}
								</div>
								<FormDescription className="hidden" />
								<FormMessage className="text-xs" />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full mobile-xs:my-2">
						{isPending ? (
							<Loader2 className="animate-spin" />
						) : (
							<SendHorizonal />
						)}
						Войти
					</Button>
				</form>
			</Form>
			<div className="flex w-full mobile-xs:flex-col items-center justify-between tablet-md:flex-row">
				<span className="text-xs text-sky-600">
					Нет акаунта? Зарегистрируйтесь!
				</span>
				<Button
					disabled={isPending}
					variant={'outline'}
					onClick={() => authChoice({ type: 'REGISTER' })}
				>
					<UserRoundPlus />
					Регистрация
				</Button>
			</div>
		</div>
	)
}
