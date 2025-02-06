import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useConfirm } from '@/hooks/useConfirm'
import React from 'react'

export const DialogConfirm: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const { actionValue } = useConfirm()
	return (
		<AlertDialog>
			<AlertDialogTrigger>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Вы уверены что хотите удалить?</AlertDialogTitle>
					<AlertDialogDescription>
						Записи удалятся с Базы данных
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						onClick={() =>
							actionValue &&
							actionValue.handleCancel &&
							actionValue.handleCancel()
						}
					>
						Нет
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={() =>
							actionValue &&
							actionValue.handleConfirm &&
							actionValue.handleConfirm()
						}
					>
						Да
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
