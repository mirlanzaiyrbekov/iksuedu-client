import { useParams } from 'react-router-dom'

export const QuizProcessPage = () => {
	const { slug } = useParams<{ slug: string }>()

	return (
		<>
			<div></div>
		</>
	)
}
