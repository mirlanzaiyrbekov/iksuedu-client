import { IQuiz } from '@/interfaces/quiz.interface'
import { Eye } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table'

interface IDefendantListsProps {
	data: IQuiz
}
export const DefendantLists: React.FC<IDefendantListsProps> = ({ data }) => {
	const navigate = useNavigate()

	console.log(data)
	return (
		<section className="my-2">
			<h4 className="mt-5 mb-3 text-sm font-medium">Список сдавших</h4>
			<div className="flex flex-col gap-2 max-h-60 h-full border rounded-md shadow-sm shadow-neutral-200">
				<Table>
					<TableCaption className="hidden"></TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="hidden tablet-lg:table-cell text-center">
								ФИО
							</TableHead>
							<TableHead className="hidden tablet-lg:table-cell text-center">
								Учебное заведение
							</TableHead>
							<TableHead className="hidden tablet-lg:table-cell text-center">
								Номер телефона
							</TableHead>
							<TableHead className="hidden tablet-lg:table-cell text-center">
								Набранный бал
							</TableHead>
							<TableHead className="text-center">Просмотр ответов</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.defendants.map((defendant) => (
							<TableRow key={defendant.id}>
								<TableCell className="hidden tablet-lg:table-cell text-center">
									{defendant.fullName}
								</TableCell>
								<TableCell className="hidden tablet-lg:table-cell text-center">
									{defendant.school}
								</TableCell>
								<TableCell className="hidden tablet-lg:table-cell text-center">
									{defendant.phone}
								</TableCell>
								<TableCell
									className={`${
										defendant.score < data.passedScore
											? 'text-red-500'
											: 'text-green-500'
									} hidden tablet-lg:table-cell text-center`}
								>
									{defendant.score}%
								</TableCell>
								<TableCell className="text-center">
									<Button
										size={'sm'}
										variant={'outline'}
										onClick={() =>
											navigate(`/defendant/answers/${data.id}/${defendant.id}`)
										}
									>
										<Eye />
										Ответы
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</section>
	)
}
