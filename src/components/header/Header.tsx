import { useUser } from '@/hooks/use-user'
import { PencilLine, Scroll } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Separator } from '../ui/separator'
import { UserComponent } from '../user'

export const Header = () => {
	const { user } = useUser()
	return (
		<div className="flex flex-col gap-1.5 bg-primary/90">
			<div className="flex items-center justify-between py-2 px-10">
				<div className="p-2">
					<span className="text-white font-bold">IKSU - Academy</span>
				</div>
				<div className="flex items-center gap-10 text-white">
					{!user ? null : (
						<ul className="flex items-center gap-9">
							<li className="text-sm">
								<Link
									to={'/'}
									className="flex items-center gap-2 hover:text-sky-300"
								>
									<Scroll size={16} />
									Мои тесты
								</Link>
							</li>
							<li className="text-sm">
								<Link
									to={'/create'}
									className="flex items-center gap-2 hover:text-sky-300"
								>
									<PencilLine size={16} />
									Создать тест
								</Link>
							</li>
						</ul>
					)}
					<UserComponent />
				</div>
			</div>
			<Separator />
		</div>
	)
}
