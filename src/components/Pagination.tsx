import ReactPaginate from 'react-paginate';

type PaginationProps = {
    currentPage: number,
    totalCount: number,
    onPageChange: (pageNumber: number) => void,
}

export default function Pagination({ currentPage, totalCount, onPageChange }: PaginationProps) {

    return (
        <ReactPaginate
            className='flex items-center justify-center gap-2 my-4'
            breakLabel="..."
            breakClassName="px-4 py-2"
            nextLabel="Next >"
            nextClassName='flex item-center justify-center bg-slate-100'
            nextLinkClassName={`block px-4 py-2 ${currentPage < totalCount ? 'hover:bg-black hover:text-white' : ''} rounded`}
            activeClassName="bg-black rounded"
            activeLinkClassName="bg-black text-white"
            onPageChange={(selected) => onPageChange(selected.selected + 1)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={totalCount}
            previousLabel="< Previous"
            previousClassName='flex item-center justify-center bg-slate-100'
            previousLinkClassName={`block px-4 py-2 ${currentPage > 1 ? 'hover:bg-black hover:text-white' : ''} rounded`}
            disabledClassName='cursor-not-allowed event-none hover:text-black'
            disabledLinkClassName='cursor-not-allowed opacity-50 hover:bg-slate-100 hover:text-black'
            renderOnZeroPageCount={null}
            pageClassName='flex item-center justify-center bg-slate-100'
            pageLinkClassName='block px-4 py-2 bg-inherit-700 hover:bg-black hover:text-white rounded'
        />
    )
}
