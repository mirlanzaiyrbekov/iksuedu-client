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
import { loginScheme } from '@/services/scheme/auth.scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Eye,
	EyeOff,
	SendHorizonal,
	UserRoundCheck,
	UserRoundPlus,
} from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const SignIn: React.FC<IAuthProps> = ({ authChoice }) => {
	const [inputType, setInputType] = React.useState<boolean>(false)

	const form = useForm<z.infer<typeof loginScheme>>({
		resolver: zodResolver(loginScheme),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	function onSubmit(values: z.infer<typeof loginScheme>) {
		console.log(values)
	}
	return (
		<div className="flex flex-col gap-8 items-center py-10 max-w-sm w-full">
			<h4 className="text-2xl font-medium text-primary/90 flex items-center gap-1.5">
				<UserRoundCheck />
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
								<FormMessage className="text-xs absolute -bottom-4 right-0" />
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
								<FormMessage className="text-xs absolute -bottom-4 right-0" />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full">
						<SendHorizonal />
						Войти
					</Button>
				</form>
			</Form>
			<div className="flex justify-between items-center w-full">
				<span className="text-xs text-orange-500">
					Нет акаунта? Зарегистрируйтесь!
				</span>
				<Button
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
