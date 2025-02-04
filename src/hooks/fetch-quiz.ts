import { quizService } from '@/services/quiz.service'
import { useQuery } from '@tanstack/react-query'

export const useFetchQuiz = (id?: string) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['getQuiz', id],
		queryFn: () => quizService.fetchQuizById(String(id)),
		select: ({ data }) => data,
		enabled: !!id,
	})

	return {
		data,
		isLoading,
		isError,
	}
}
