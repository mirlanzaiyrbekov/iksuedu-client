import { Loader2 } from 'lucide-react'

export const LoaderComponent = () => {
	return (
		<div className="absolute top-0 left-0 w-full h-full z-[100] flex items-center justify-center">
			<div className="flex flex-col gap-2 items-center">
				<Loader2 className="animate-spin" />
				<span className="text-sm">Загрузка данных...</span>
			</div>
		</div>
	)
}
