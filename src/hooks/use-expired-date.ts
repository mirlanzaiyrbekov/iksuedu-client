import { differenceInDays } from 'date-fns'
import React from 'react'

export const useExpiredDate = (date: Date) => {
	const [inActive, setInActive] = React.useState(false)
	const [leftDays, setLeftDays] = React.useState(0)

	const start = new Date()
	const end = new Date(date)

	React.useEffect(() => {
		if (end < new Date()) {
			setInActive(true)
		} else {
			setLeftDays(differenceInDays(end, start))
		}
	}, [date])

	return {
		inActive,
		leftDays,
	}
}
