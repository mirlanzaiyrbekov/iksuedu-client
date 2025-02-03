import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface ISelectDataProps {
	date: Date | undefined
	setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}
export const SelectData: React.FC<ISelectDataProps> = ({ setDate, date }) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-[280px] justify-start text-left font-normal',
						!date && 'text-muted-foreground'
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? (
						format(date, 'PPP', { locale: ru })
					) : (
						<span>Выберите дату</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					initialFocus
					locale={ru}
				/>
			</PopoverContent>
		</Popover>
	)
}
