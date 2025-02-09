export const Footer = () => {
	const dateNow = new Date().getFullYear()
	return (
		<>
			<div className="px-12 py-4 flex items-center justify-between">
				<ul className="flex items-center gap-2">
					<li className="flex items-center gap-1">
						<small className="text-xs">&copy;</small>
						<span className="text-sky-500 text-[12px]">{dateNow}</span>
					</li>
					<li className="flex items-center gap-2">
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
