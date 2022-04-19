import { FormEvent, useEffect, useState } from 'react';
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
  HiDotsHorizontal,
} from 'react-icons/hi';
import { MdKeyboardArrowRight } from 'react-icons/md';
import useRouter from './useRouter';

interface PaginationProps {
  totalItems: number;
}

function Pagination({ totalItems }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [futureCurrentPage, setFutureCurrentPage] = useState<number | null>(null);
  const { pathname, push } = useRouter();

  useEffect(() => {
    const pages = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(pages);
    push(`${pathname}?page=${currentPage}&itemsPerPage=${itemsPerPage}`);
  }, [currentPage, totalPages, itemsPerPage, totalItems, push, pathname]);

  const goToFirstPage = () => setCurrentPage(1);
  const goToPrevPage = () => setCurrentPage(currentPage - 1);
  const goToNextPage = () => setCurrentPage(currentPage + 1);
  const goToLastPage = () => setCurrentPage(totalPages);

  const last5Pages = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];

  const goToPage = (e: FormEvent) => {
    e.preventDefault();
    if (futureCurrentPage) setCurrentPage(futureCurrentPage);
  };

  const singlePageNumber = (page: number) => {
    return (
      <button
        className={`pagination-btn number ${currentPage === page ? 'active' : null}`}
        key={page}
        type="button"
        onClick={() => setCurrentPage(page)}
        onKeyDown={() => setCurrentPage(page)}
      >
        {page}
      </button>
    );
  };

  const pages = () => {
    if (totalPages < 7) {
      return (
        <>
          {Array(totalPages)
            .fill(0)
            .map((_, page) => singlePageNumber(page + 1))}
        </>
      );
    }
    if (totalPages >= 7 && currentPage < 3) {
      return (
        <>
          {[1, 2, 3, 4, 5].map((page) => singlePageNumber(page))}
          <HiDotsHorizontal className="dots" />
          {singlePageNumber(totalPages)}
        </>
      );
    }
    if (totalPages >= 7 && currentPage >= 3 && currentPage <= totalPages - 2) {
      return (
        <>
          {singlePageNumber(1)}
          <HiDotsHorizontal className="dots" />
          {singlePageNumber(currentPage - 1)}
          {singlePageNumber(currentPage)}
          {singlePageNumber(currentPage + 1)}
          <HiDotsHorizontal className="dots" />
          {singlePageNumber(totalPages)}
        </>
      );
    }
    if (totalPages >= 7 && currentPage >= totalPages - 2) {
      return (
        <>
          {singlePageNumber(1)}
          <HiDotsHorizontal className="dots" />
          {last5Pages.map((page) => singlePageNumber(page))}
        </>
      );
    }
    return null;
  };

  const results = () => {
    return (
      <>
        {(currentPage - 1) * itemsPerPage + 1} -{' '}
        {currentPage * itemsPerPage >= totalItems ? totalItems : currentPage * itemsPerPage}
      </>
    );
  };

  return (
    <div className="pagination">
      <div className="pagination-top">
        <HiChevronDoubleLeft
          className={`pagination-btn ${currentPage === 1 ? 'disabled' : null}`}
          onClick={goToFirstPage}
        />
        <HiChevronLeft
          className={`pagination-btn ${currentPage === 1 ? 'disabled' : null}`}
          onClick={goToPrevPage}
        />

        <div className="pagination__numbers">{pages()}</div>

        <HiChevronRight
          className={`pagination-btn ${currentPage === totalPages ? 'disabled' : null}`}
          onClick={goToNextPage}
        />
        <HiChevronDoubleRight
          className={`pagination-btn ${currentPage === totalPages ? 'disabled' : null}`}
          onClick={goToLastPage}
        />
      </div>
      <div className="pagination-bottom">
        <div className="pagination-inputs">
          <select
            name=""
            id=""
            className="pagination-input"
            onChange={(e) => {
              setCurrentPage(1);
              setItemsPerPage(Number(e.target.value));
            }}
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={36}>36</option>
            <option value={48}>48</option>
          </select>

          <form onSubmit={goToPage} className={totalPages === 1 ? 'disabled' : ''}>
            <label htmlFor="goToPage GTP">
              <span className="GTP-span">Go to page</span>
              <input
                name="goToPage"
                id="goToPage"
                type="number"
                min={0}
                max={totalPages}
                className="pagination-input GTP-input"
                onChange={(e) => setFutureCurrentPage(Number(e.target.value))}
              />
              <button type="submit" className="GTP-btn">
                <MdKeyboardArrowRight />
              </button>
            </label>
          </form>
        </div>

        <p>
          Results: {results()} of {totalItems}
        </p>
      </div>
    </div>
  );
}

export default Pagination;
