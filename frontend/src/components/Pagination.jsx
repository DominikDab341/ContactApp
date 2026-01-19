import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination-bar">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(prev => prev - 1)}
        className="btn pagination-btn"
      >
        Poprzednia
      </button>

      <span className="page-info">
        Strona <strong>{currentPage}</strong> z {totalPages || 1}
      </span>

      <button
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onPageChange(prev => prev + 1)}
        className="btn pagination-btn"
      >
        Następna
      </button>
    </div>
  );
};

export default Pagination;