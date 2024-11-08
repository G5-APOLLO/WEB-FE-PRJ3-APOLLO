import React from 'react';
import { Pagination } from '@mui/material';

interface PaginationModel {
  page: number;
  pageSize: number;
}

interface CustomPaginationProps {
  paginationModel: PaginationModel;
  setPaginationModel: React.Dispatch<React.SetStateAction<PaginationModel>>;
  totalPages: number;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ paginationModel, setPaginationModel, totalPages }) => {
  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPaginationModel((prevModel) => ({
      ...prevModel,
      page: newPage,
    }));
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaginationModel((prevModel) => ({
      ...prevModel,
      pageSize: parseInt(event.target.value, 10),
    }));
  };

  return (
    <div className="flex items-center justify-between p-2">
      <select
        value={paginationModel.pageSize}
        onChange={handlePageSizeChange}
        className="p-2 border border-gray-300 rounded-md"
      >
        {[10, 20, 50, 100].map((size) => (
          <option key={size} value={size}>
            {size} rows
          </option>
        ))}
      </select>
      <Pagination
        count={totalPages}
        page={paginationModel.page}
        onChange={handlePageChange}
        className="ml-auto"
      />
    </div>
  );
};

export default CustomPagination;