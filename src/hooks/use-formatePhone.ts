// hooks/use-formatePhone.ts
import { useCallback } from 'react'

export const usePhoneInput = () => {
	const formatPhone = useCallback((inputValue: string) => {
		let value = inputValue.replace(/\D/g, '')

		if (!value.startsWith('996') && value.length > 0) {
			value = '996' + value
		}

		if (value.length > 12) {
			value = value.substring(0, 12)
		}

		let formattedValue = ''
		if (value.length > 0) {
			formattedValue = `+${value.substring(0, 3)}`
			if (value.length > 3) {
				formattedValue += ` ${value.substring(3, 6)}`
			}
			if (value.length > 6) {
				formattedValue += ` ${value.substring(6, 9)}`
			}
			if (value.length > 9) {
				formattedValue += ` ${value.substring(9, 12)}`
			}
		}

		return formattedValue
	}, [])

	return {
		formatPhone,
	}
}
