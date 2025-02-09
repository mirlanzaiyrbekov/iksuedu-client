import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { useUser } from '@/hooks/use-user'
import { Menu, PencilLine, Scroll } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Separator } from '../ui/separator'
import { UserComponent } from '../user'
export const Header = () => {
	const { user } = useUser()
	return (
		<div className="flex flex-col gap-1.5 bg-primary/90">
			<div className="flex items-center justify-between mobile-xs:p-1 tablet-md:p-3">
				<div className="p-2">
					<span className="text-white font-bold mobile-xs:text-xs tablet-md:text-base">
						IKSU - Academy
					</span>
				</div>
				<div className="mobile-xs:hidden tablet-md:flex items-center gap-10 text-white ">
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

				<div className="tablet-md:hidden">
					<Sheet>
						<SheetTrigger>
							<div className="text-white pr-2">
								<Menu size={16} />
							</div>
						</SheetTrigger>
						<SheetContent className="mobile-xs:w-full">
							<SheetHeader>
								<SheetTitle className="hidden" />
								<SheetDescription asChild>
									<div className="flex items-center justify-center p-10">
										{!user ? null : (
											<ul className="flex flex-col gap-4">
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
									</div>
								</SheetDescription>
							</SheetHeader>
						</SheetContent>
					</Sheet>
				</div>
			</div>
			<Separator />
		</div>
	)
}
