import { Button } from '@/components/button'
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
import { IAuthProps } from '@/pages/auth'
import { registerScheme } from '@/services/scheme/auth.scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { SendHorizonal, UserRoundCheck, UserRoundPlus } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const SignUp: React.FC<IAuthProps> = ({ authChoice }) => {
	const form = useForm<z.infer<typeof registerScheme>>({
		resolver: zodResolver(registerScheme),
		defaultValues: {
			firstName: '',
			lastName: '',
			thirdName: '',
			email: '',
			password: '',
			phone: '',
		},
	})

	function onSubmit(values: z.infer<typeof registerScheme>) {
		console.log(values)
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
									<FormMessage className="text-xs absolute -bottom-4 right-0" />
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
									<FormMessage className="text-xs absolute -bottom-4 right-0" />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="thirdName"
						render={({ field }) => (
							<FormItem className="w-full relative">
								<FormLabel>Отчество</FormLabel>
								<FormControl>
									<Input placeholder="Отчество" {...field} />
								</FormControl>
								<FormDescription className="hidden" />
								<FormMessage className="text-xs absolute top-0 right-0" />
							</FormItem>
						)}
					/>
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
									<FormMessage className="text-xs absolute -bottom-4 right-0" />
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
									<FormMessage className="text-xs absolute -bottom-4 right-0" />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="phone"
						rules={{ maxLength: 9 }}
						render={({ field }) => (
							<FormItem className="w-full relative">
								<FormLabel>Телефон</FormLabel>
								<FormControl>
									<Input
										placeholder="Телефон в формате: 9989944345"
										{...field}
									/>
								</FormControl>
								<FormDescription className="hidden" />
								<FormMessage className="text-xs absolute top-0 right-0" />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full">
						<SendHorizonal />
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
