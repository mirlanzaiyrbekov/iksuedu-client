export const Footer = () => {
	const dateNow = new Date().getFullYear()
	return (
		<>
			<div className="flex gap-1 mobile-xs:flex-col mobile-xs:p-5 mobile-lg:p-10 tablet-sm:justify-between tablet-md:flex-row">
				<ul className="flex gap-1 mobile-xs:items-end">
					<li className="flex gap-1 flex-col mobile-sm:flex-row mobile-sm:items-center">
						<small className="text-[10px]">
							Developed at the initiative of
						</small>
						<span className="text-sky-500 text-[12px] ">
							Saltanat Dzhaparova.
						</span>
					</li>
					<li className="flex items-center gap-1">
						<small className="text-xs">&copy;</small>
						<span className="text-sky-500 text-[12px]">{dateNow}</span>
					</li>
				</ul>

				<span className="text-xs text-purple-400">
					Developed by the team: Falcon Group
				</span>
			</div>
		</>
	)
}
