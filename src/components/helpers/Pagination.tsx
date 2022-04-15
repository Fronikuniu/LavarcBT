import { useEffect, useState } from 'react';
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
  HiDotsHorizontal,
} from 'react-icons/hi';

interface PaginationProps {
  totalItems: number;
}

function Pagination({ totalItems }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const pages = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(pages);
  }, [currentPage, totalPages, itemsPerPage, totalItems]);

  const goToFirstPage = () => setCurrentPage(1);
  const goToPrevPage = () => setCurrentPage(currentPage - 1);
  const goToNextPage = () => setCurrentPage(currentPage + 1);
  const goToLastPage = () => setCurrentPage(totalPages);

  const last5Pages = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];

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
      return <>{[1, 2, 3, 4, 5, 6].map((page) => singlePageNumber(page))}</>;
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

  return (
    <div className="pagination">
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
  );
}

export default Pagination;
