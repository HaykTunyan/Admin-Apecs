import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange?: (pageNumber: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  /**
   * @description Pagination component with validation
   */
  
  if (!Number.isInteger(totalPages) || totalPages <= 0) return null;

  return (
    <div className="flex space-x-3">
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1; 

        return (
          <div
            key={pageNumber}
            className={`rounded-lg py-2.5 px-5 flex justify-center items-center cursor-pointer 
              ${currentPage === pageNumber ? "bg-foreground-brand-primary" : ""}`}
            onClick={() => onPageChange?.(pageNumber)}
          >
            <span
              className={`${
                currentPage === pageNumber
                  ? "text-white"
                  : "text-tertiary"
              } font-medium text-base leading-5`}
            >
              {pageNumber}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Pagination;
