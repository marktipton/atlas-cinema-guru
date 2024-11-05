import React from 'react';

interface PaginationProps {
  currentPage: number;
  hasMore: boolean;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, hasMore, onPageChange }) => {
  const handlePageChange = (page: number) => {
    console.log(`Requested page: ${page}`);
    onPageChange(page);
  };

  return (
    <div className="flex justify-center mt-8 gap-1">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-teal text-white rounded-l-full"
      >
        Previous
      </button>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasMore} // Disable if no more titles are available
        className="px-4 py-2 bg-teal text-white rounded-r-full"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;