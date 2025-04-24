import React, { useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  perPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // Number of sibling page buttons to show (default is 1)
  boundaryCount?: number; // Number of page buttons at the start and end (default is 1)
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  perPage,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
}) => {
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / perPage);

  // Prevent going below page 1 or above totalPages
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Calculate page numbers to display
  const range = (start: number, end: number) => {
    let length = end - start + 1;
    return [...Array(length)].map((_, idx) => start + idx);
  };

  const paginationRange = () => {
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const pageNumbers = [
      ...range(1, boundaryCount), // First few pages
      ...range(leftSiblingIndex, rightSiblingIndex), // Middle pages
      ...range(totalPages - boundaryCount + 1, totalPages), // Last few pages
    ];

    return pageNumbers.filter(
      (page, index, array) => index === 0 || page !== array[index - 1] // Remove duplicates
    );
  };

  // Jump to specific page logic
  const [jumpPage, setJumpPage] = useState<string>("");

  const handleJumpPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Ensure the value is a valid page number
    if (/^\d*$/.test(value)) {
      setJumpPage(value);
    }
  };

  const handleJumpToPage = () => {
    const pageNumber = parseInt(jumpPage, 10);
    if (pageNumber && pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
      setJumpPage("");
    }
  };

  // Hide pagination if there's only one page
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <button
        className={`px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 ${
          currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {paginationRange().map((page, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded-lg text-white hover:bg-gray-600 ${
            page === currentPage ? "bg-blue-600" : "bg-gray-700"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={`px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 ${
          currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

      {/* Jump to page input */}
      <div className="flex items-center space-x-2 ml-4">
        <input
          type="text"
          value={jumpPage}
          onChange={handleJumpPageChange}
          placeholder="Go to page"
          className="px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md"
        />
        <button
          onClick={handleJumpToPage}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default Pagination;
