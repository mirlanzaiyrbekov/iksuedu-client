import { useUser } from '@/hooks/use-user'
import { LogOutIcon } from 'lucide-react'
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
						size={'sm'}
						title="Выйти"
						className="text-xs text-neutral-700"
						variant={'link'}
						onClick={logOutHandle}
					>
						<LogOutIcon />
					</Button>
				</div>
			) : null}
		</>
	)
}
