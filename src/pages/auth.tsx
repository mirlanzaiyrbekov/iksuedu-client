import { SignIn } from '@/components/auth/Signin'
import { SignUp } from '@/components/auth/Signup'
import React from 'react'

interface IAuthType {
	type: 'REGISTER' | 'LOGIN'
}
export interface IAuthProps {
	authChoice: React.Dispatch<React.SetStateAction<IAuthType>>
}
export const AuthPage = () => {
	const [authType, setAuthType] = React.useState<IAuthType>({ type: 'LOGIN' })

	switch (authType.type) {
		case 'LOGIN':
			return (
				<div className="flex items-center justify-center">
					<SignIn authChoice={setAuthType} />
				</div>
			)
		case 'REGISTER':
			return (
				<div className="flex items-center justify-center">
					{' '}
					<SignUp authChoice={setAuthType} />
				</div>
			)

		default:
			return (
				<div className="flex items-center justify-center">
					<SignIn authChoice={setAuthType} />
				</div>
			)
	}
}
