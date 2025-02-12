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
import { Separator } from '../ui/separator'
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
		<div className="flex flex-col gap-1.5 bg-primary/90">
			<div className="flex items-center justify-between mobile-xs:p-1 tablet-md:p-3">
				<div className="p-2">
					<span className="text-white font-bold mobile-xs:text-xs mobile-sm:text-base">
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

				{user ? (
					<div className="tablet-md:hidden flex items-center justify-center mr-2">
						<Sheet
							open={isSheetOpen}
							onOpenChange={() => setIsSheetOpen(!isSheetOpen)}
						>
							<SheetTrigger>
								<div
									className="text-white flex items-center justify-center"
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
															className="text-xs text-white w-full text-primary"
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
			<Separator />
		</div>
	)
}
