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
	return (
		<section className="my-2">
			<h4 className="mt-5 mb-3 text-sm font-medium">Список сдавших</h4>
			<div className="flex flex-col gap-2 max-h-56 h-full">
				<Table className="border">
					<TableCaption className="hidden"></TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[300px]">Имя</TableHead>
							<TableHead>Фамилия</TableHead>
							<TableHead>E-mail</TableHead>
							<TableHead>Учебное заведение</TableHead>
							<TableHead>Просмотр ответов</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.defendants.map((defendant) => (
							<TableRow key={defendant.id}>
								<TableCell>{defendant.firstName}</TableCell>
								<TableCell>{defendant.lastName}</TableCell>
								<TableCell>{defendant.email}</TableCell>
								<TableCell>{defendant.school}</TableCell>
								<TableCell>
									<Button
										size={'sm'}
										variant={'outline'}
										onClick={() =>
											navigate(`/defendant/answers/${data.id}/${defendant.id}`)
										}
									>
										<Eye />
										Результаты теста
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
