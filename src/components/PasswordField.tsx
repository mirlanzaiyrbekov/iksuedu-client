import { Eye, EyeOff } from 'lucide-react'
import React from 'react'
import { Control } from 'react-hook-form'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form'
import { Input } from './ui/input'

interface IPasswordFieldProps {
	control: Control<any> | undefined
	fieldName: string
}
export const PasswordField: React.FC<IPasswordFieldProps> = ({
	control,
	fieldName,
}) => {
	const [inputType, setInputType] = React.useState<boolean>(false)
	return (
		<FormField
			control={control}
			name={fieldName}
			render={({ field }) => (
				<FormItem className="relative">
					<FormLabel>Пароль</FormLabel>
					<FormControl>
						<Input
							placeholder="Пароль"
							{...field}
							type={`${!inputType ? 'text' : 'password'}`}
						/>
						<div
							className="absolute right-0 top-1/2"
							onClick={() => setInputType(!inputType)}
						>
							{!inputType ? <Eye /> : <EyeOff />}
						</div>
					</FormControl>
					<FormDescription className="hidden" />
					<FormMessage className="text-xs absolute -bottom-4 right-0" />
				</FormItem>
			)}
		/>
	)
}
