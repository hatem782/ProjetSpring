import React from "react";
import Pagination from "@mui/material/Pagination";

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  const handleChange = (event, value) => {
    onPageChange(value - 1);
  };

  return (
    <Pagination
      count={totalPages}
      page={currentPage + 1}
      onChange={handleChange}
    />
  );
};

export default PaginationComponent;
