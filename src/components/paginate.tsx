import React from 'react'
import ReactPaginate from 'react-paginate'

interface IPaginateProps {
	pageCount: number
	handlePageChange: (selectedItem: { selected: number }) => void
}
export const PaginateComponent: React.FC<IPaginateProps> = ({
	pageCount,
	handlePageChange,
}) => {
	if (pageCount <= 1) return null
	return (
		<div className="flex justify-center mt-5">
			<ReactPaginate
				previousLabel={'←'}
				nextLabel={'→'}
				breakLabel={'...'}
				pageCount={pageCount}
				marginPagesDisplayed={2}
				pageRangeDisplayed={3}
				onPageChange={handlePageChange}
				containerClassName={'pagination flex gap-2 text-xs'}
				pageClassName={'px-3 py-1 border rounded-md cursor-pointer'}
				activeClassName={'bg-primary/50 text-white'}
				previousClassName={'px-3 py-1 border rounded-md cursor-pointer'}
				nextClassName={'px-3 py-1 border rounded-md cursor-pointer'}
				disabledClassName={'opacity-50 cursor-not-allowed'}
			/>
		</div>
	)
}
