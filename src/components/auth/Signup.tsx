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
import { toast } from '@/hooks/use-toast'
import { IAuthProps } from '@/pages/auth'
import { authService } from '@/services/auth.service'
import { signUpScheme } from '@/services/scheme/auth.scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import {
	Loader2,
	SendHorizonal,
	UserRoundCheck,
	UserRoundPlus,
} from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'

export const SignUp: React.FC<IAuthProps> = ({ authChoice }) => {
	const { isPending, mutateAsync } = useMutation({
		mutationKey: ['registerUser'],
		mutationFn: (data: z.infer<typeof signUpScheme>) =>
			authService.signUp(data),
	})

	const form = useForm<z.infer<typeof signUpScheme>>({
		resolver: zodResolver(signUpScheme),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		},
	})

	async function onSubmit(values: z.infer<typeof signUpScheme>) {
		try {
			await mutateAsync(values, {
				onSuccess({ data }) {
					toast({
						title: `${data.message}`,
					})
					authChoice({ type: 'LOGIN' })
				},
			})
		} catch (error) {
			toast({
				title: `${String(error)}`,
			})
		}
	}
	return (
		<div className="flex flex-col gap-8 items-center py-10">
			<h4 className="text-2xl font-medium text-primary/90 flex items-center gap-1.5">
				<UserRoundPlus />
				Регистрация
			</h4>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col items-center max-w-screen-md space-y-3"
				>
					<div className="flex items-center gap-2">
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem className="relative">
									<FormLabel>Имя</FormLabel>
									<FormControl>
										<Input placeholder="Имя" {...field} />
									</FormControl>
									<FormDescription className="hidden" />
									<FormMessage className="text-xs" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem className="relative">
									<FormLabel>Фамилия</FormLabel>
									<FormControl>
										<Input placeholder="Фамилия" {...field} />
									</FormControl>
									<FormDescription className="hidden" />
									<FormMessage className="text-xs" />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex items-center gap-2">
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
							name="password"
							render={({ field }) => (
								<FormItem className="relative">
									<FormLabel>Пароль</FormLabel>
									<FormControl>
										<Input placeholder="Пароль" {...field} />
									</FormControl>
									<FormDescription className="hidden" />
									<FormMessage className="text-xs" />
								</FormItem>
							)}
						/>
					</div>

					<Button disabled={isPending} type="submit" className="w-full">
						{isPending ? (
							<Loader2 className="animate-spin" />
						) : (
							<SendHorizonal />
						)}
						Регистрация
					</Button>
				</form>
			</Form>

			<div className="flex justify-between items-center w-full">
				<span className="text-xs text-sky-500">
					Есть акаунт? Выполните вход!
				</span>
				<Button
					variant={'outline'}
					onClick={() => authChoice({ type: 'LOGIN' })}
				>
					<UserRoundCheck />
					Войти
				</Button>
			</div>
		</div>
	)
}
