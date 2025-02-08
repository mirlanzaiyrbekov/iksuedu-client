import { Helmet } from 'react-helmet-async'

export const NotFoundPage = () => {
	return (
		<>
			<Helmet>
				<title>Ошибка: cтраница не найдена</title>
			</Helmet>
			<section>
				<div className="flex items-center justify-center min-h-[50vh]">
					<div className="p-5">
						<span className="text-sm text-sky-950">
							Страница не найдена | 404
						</span>
					</div>
				</div>
			</section>
		</>
	)
}
