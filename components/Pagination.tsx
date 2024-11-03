import React from "react";
import { useTitles } from "@/contexts/TitlesContext";

const Pagination = () => {
  const { currentPage, totalPages, setPage } = useTitles();

  const handlePrevious = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setPage(currentPage + 1);
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-2 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-teal text-white"}`}
      >
        Previous
      </button>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-2 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "bg-teal text-white"}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;