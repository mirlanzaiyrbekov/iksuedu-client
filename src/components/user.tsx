import { useUser } from '@/hooks/use-user'
import React from 'react'
import { Button } from './ui/button'

export const UserComponent: React.FC = () => {
	const { user, logOutHandle } = useUser()

	return (
		<>
			{user ? (
				<div className="flex items-center gap-1.5">
					<small className="text-xs text-sky-600">Привет,</small>
					<span className="text-sm">{user.firstName}</span>
					<Button
						className="text-xs text-white"
						variant={'link'}
						onClick={logOutHandle}
					>
						Выйти
					</Button>
				</div>
			) : null}
		</>
	)
}
