import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { useUser } from '@/hooks/use-user'
import { LogOut, Menu, PencilLine, Scroll } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { UserComponent } from '../user'
export const Header = () => {
	const { user, logOutHandle } = useUser()
	const [isSheetOpen, setIsSheetOpen] = React.useState(false)
	const { pathname } = useLocation()

	React.useEffect(() => {
		if (isSheetOpen) {
			setIsSheetOpen(!isSheetOpen)
		}
	}, [pathname])

	return (
		<div className="flex flex-col gap-1.5  shadow-slate-100 shadow-sm">
			<div className="flex items-center justify-between mobile-xs:p-1 tablet-md:px-8 tablet-md:py-2">
				<Link to={'/'} className="flex items-center gap-1.5">
					<img className="w-14 h-14" src="/logo.png" alt="logo" />
					<div className="flex flex-col text-sm text-neutral-700">
						<span>Iksu</span>
						<span>Academy</span>
					</div>
				</Link>
				<div className="mobile-xs:hidden flex tablet-md:flex items-center gap-10 text-neutral-700 ">
					{!user ? null : (
						<ul className="flex items-center gap-9">
							<li className="text-sm">
								<Link
									to={'/'}
									className="flex items-center gap-2 hover:text-sky-600"
								>
									<Scroll size={16} />
									Мои тесты
								</Link>
							</li>
							<li className="text-sm">
								<Link
									to={'/create'}
									className="flex items-center gap-2 hover:text-sky-600"
								>
									<PencilLine size={16} />
									Создать тест
								</Link>
							</li>
						</ul>
					)}
					<UserComponent />
				</div>

				{user ? (
					<div className="tablet-md:hidden flex items-center justify-center mr-2">
						<Sheet
							open={isSheetOpen}
							onOpenChange={() => setIsSheetOpen(!isSheetOpen)}
						>
							<SheetTrigger>
								<div
									className="text-neutral-700 flex items-center justify-center"
									onClick={() => setIsSheetOpen(!isSheetOpen)}
								>
									<Menu size={20} />
								</div>
							</SheetTrigger>
							<SheetContent className="mobile-xs:w-full">
								<SheetHeader>
									<SheetTitle className="hidden" />
									<SheetDescription asChild>
										<div className="flex flex-col gap-10 p-2 w-full h-screen">
											<div className="flex items-start">
												<span className="font-bold mobile-xs:text-xs mobile-sm:text-[18px]">
													IKSU - Academy
												</span>
											</div>
											{
												<ul className="flex flex-col gap-2">
													<li className="text-sm">
														<Link
															to={'/'}
															className="mobile-sm:text-base text-primary flex items-center gap-2 hover:text-sky-300"
														>
															<Scroll size={16} />
															Мои тесты
														</Link>
													</li>
													<li className="text-sm">
														<Link
															to={'/create'}
															className="mobile-sm:text-base text-primary flex items-center gap-2 hover:text-sky-300"
														>
															<PencilLine size={16} />
															Создать тест
														</Link>
													</li>
													<li className="my-5">
														<Button
															className="text-xs text-neutral-700 w-full text-primary"
															onClick={logOutHandle}
															variant={'outline'}
														>
															<LogOut />
															Выйти с аккаунта
														</Button>
													</li>
												</ul>
											}
										</div>
									</SheetDescription>
								</SheetHeader>
							</SheetContent>
						</Sheet>
					</div>
				) : null}
			</div>
		</div>
	)
}
