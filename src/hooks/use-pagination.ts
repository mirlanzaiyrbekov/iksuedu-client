import { IQuiz } from '@/interfaces/quiz.interface'
import React from 'react'

export const usePagination = (data: IQuiz[]) => {
	const [currentPage, setCurrentPage] = React.useState(0)
	const itemsPerPage = 4

	const offset = currentPage * itemsPerPage
	const currentQuizzes = data?.slice(offset, offset + itemsPerPage)
	const pageCount = Math.ceil((data?.length || 0) / itemsPerPage)

	const handlePageChange = ({ selected }: { selected: number }) => {
		setCurrentPage(selected)
	}

	return {
		currentPage,
		pageCount,
		currentQuizzes,
		handlePageChange,
	}
}
