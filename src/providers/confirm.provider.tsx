import {
	ConfirmContext,
	IInitialConfirmContext,
} from '@/context/confirm.context'
import React from 'react'

export const ConfirmProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [actionValue, setActionValue] = React.useState<IInitialConfirmContext>()

	const action = (value: IInitialConfirmContext) => {
		setActionValue(value)
	}

	return (
		<ConfirmContext.Provider value={{ action, actionValue }}>
			{children}
		</ConfirmContext.Provider>
	)
}
