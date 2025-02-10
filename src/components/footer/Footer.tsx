export const Footer = () => {
	const dateNow = new Date().getFullYear()
	return (
		<>
			{/* items-center justify-between */}
			<div className="flex gap-3 mobile-xs:flex-col mobile-xs:p-5 mobile-lg:p-10 tablet-sm:justify-between tablet-sm:flex-row">
				<ul className="flex gap-2 mobile-xs:flex-col tablet-sm:flex-row">
					<li className="flex items-center gap-1">
						<small className="text-xs">&copy;</small>
						<span className="text-sky-500 text-[12px]">{dateNow}</span>
					</li>
					<li className="flex gap-2 items-center">
						<small className="text-[10px]">
							Developed at the initiative of
						</small>
						<span className="text-sky-500 text-[12px] ">
							Saltanat Japarova.
						</span>
					</li>
				</ul>

				<span className="text-xs text-purple-400 font-medium">
					Developed by the team: Falcon Group
				</span>
			</div>
		</>
	)
}
