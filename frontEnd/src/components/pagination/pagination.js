import React from 'react';
import { usePagination, DOTS } from './usePagination';
const PaginationCustom = ({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, onChangeRecordsPerPage, datalenght }) => {

    const paginationRange = usePagination({ currentPage, totalCount, siblingCount, pageSize });
    const perPageArr = [5, 10, 15, 20, 25];
    if (currentPage === 0 || paginationRange?.length < 0) {
        return null;
    }
    const onNext = () => {
        onPageChange(currentPage + 1);
    };
    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };
    let lastPage = paginationRange[paginationRange?.length - 1];
    return (
        <>
            <div className="datatable-footer">
                <div className="dataTables_info" id="plan-list_info" role="status" aria-live="polite">Showing {((currentPage - 1) * pageSize) + (totalCount === 0 ? 0 : 1)} to {(currentPage - 1) * pageSize + datalenght} of {totalCount} entries
                </div>

                <div className="dataTables_length" id="plan-list_length">
                    <label>
                        <span className='me-1'>Show: </span>
                        <select onChange={onChangeRecordsPerPage} className='form-select'>
                            {perPageArr?.map((item, index) => {
                                return (
                                    <option key={index} value={item}>{item}</option>
                                )
                            })}
                        </select>
                    </label>
                </div>
                <div className="dataTables_paginate paging_simple_numbers" id="plan-list_paginate">

                    <ul className="pagination pagination-flat">
                        <li className={currentPage === 1 || totalCount === 0 ? 'paginate_button page-item previous disabled' : 'paginate_button page-item previous'} onClick={onPrevious}>
                            <a className="page-link rounded">←</a>
                        </li>


                        {paginationRange.map(pageNumber => {
                            if (pageNumber === DOTS) {
                                return <span className="ellipsis" key={pageNumber}>&#8230;</span>;
                            }
                            return (
                                <li className={pageNumber === currentPage ? 'paginate_button page-item active' : "paginate_button page-item"} key={pageNumber}>
                                    <a onClick={() => onPageChange(pageNumber)} className="page-link rounded">{pageNumber}</a>
                                </li>
                            );
                        })}

                        <li className={currentPage === lastPage || totalCount === 0 ? 'paginate_button page-item next disabled' : "paginate_button page-item next"} onClick={onNext} ><a className="page-link rounded">→</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
export default PaginationCustom;