import { useExpiredDate } from '@/hooks/use-expired-date'
import React from 'react'

interface IExpireDateComponentProps {
	date: Date
}
export const ExpireDateComponent: React.FC<IExpireDateComponentProps> = ({
	date,
}) => {
	const { inActive, leftDays } = useExpiredDate(date)

	return inActive ? (
		<span className="text-red-600">Не активен</span>
	) : (
		<span className="text-sky-900">
			{leftDays} <small className="text-[10px]">Дней</small>
		</span>
	)
}
