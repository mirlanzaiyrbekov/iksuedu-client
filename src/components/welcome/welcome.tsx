import { ShieldAlert } from 'lucide-react'
import React from 'react'

export const Welcome: React.FC = () => {
	return (
		<div className="flex flex-col gap-5 h-screen items-center justify-center">
			<h4 className="flex flex-col gap-1 text-center">
				<strong className="text-purple-700 text-xs">
					Вас приветствует Falcon Group &#129392;
				</strong>
				<span className="text-sm font-medium">
					Добро пожаловать на Iksu Academy
				</span>
			</h4>
			<p className="flex items-center gap-2 text-xs text-sky-700">
				<ShieldAlert size={15} />В данный момент сервис ожидает обновления
				&#128526;.
			</p>
		</div>
	)
}
