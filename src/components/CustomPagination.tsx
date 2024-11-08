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
  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPaginationModel((prevModel: PaginationModel) => ({
      ...prevModel,
      page: newPage - 1, 
    }));
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaginationModel((prevModel: PaginationModel) => ({
      ...prevModel,
      pageSize: parseInt(event.target.value, 10),
      page: 0, 
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
        page={paginationModel.page + 1} 
        onChange={handlePageChange}
        sx={{ '& .MuiPaginationItem-root': { borderRadius: 1 },  bgcolor: 'background.paper' }}
      />
    </div>
  );
};

export default CustomPagination;