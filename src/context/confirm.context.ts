import { createContext } from 'react'

export interface IInitialConfirmContext {
	handleConfirm?: () => void
	handleCancel?: () => void
}
interface IInitialContextProps {
	action: (actionValue: IInitialConfirmContext) => void
	actionValue: IInitialConfirmContext | undefined
}
const initialContext: IInitialContextProps = {
	action: () => {},
	actionValue: undefined,
}

export const ConfirmContext = createContext(initialContext)
