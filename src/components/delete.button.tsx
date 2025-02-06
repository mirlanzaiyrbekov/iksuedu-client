import { Trash } from 'lucide-react'
import React, { HTMLAttributes } from 'react'
import { DialogConfirm } from './dialog.confirm'

export const DeleteButton: React.FC<
	React.PropsWithChildren<HTMLAttributes<HTMLDivElement>>
> = ({ children, ...props }) => {
	return (
		<DialogConfirm>
			<div
				{...props}
				className="my-1 flex items-center gap-2 text-xs border border-destructive p-2 rounded-md"
			>
				<Trash size={14} />
				{children}
			</div>
		</DialogConfirm>
	)
}
