import { IQuiz } from '@/interfaces/quiz.interface'
import { useSearchParams } from 'react-router-dom'

export const usePagination = (data: IQuiz[]) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const currentPage = parseInt(searchParams.get('page') || '1', 10) - 1
	const itemsPerPage = 4

	const offset = currentPage * itemsPerPage
	const currentQuizzes = data?.slice(offset, offset + itemsPerPage)
	const pageCount = Math.ceil((data?.length || 0) / itemsPerPage)

	const handlePageChange = ({ selected }: { selected: number }) => {
		setSearchParams({ page: (selected + 1).toString() })
	}

	return {
		currentPage,
		pageCount,
		currentQuizzes,
		handlePageChange,
	}
}
