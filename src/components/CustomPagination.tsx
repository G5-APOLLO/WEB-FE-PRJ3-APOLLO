import React from 'react';
import { Pagination } from '@mui/material';

type CustomPaginationProps = {
  paginationModel: { pageSize: number; page: number };
  setPaginationModel: (model: { pageSize: number; page: number }) => void;
  totalPages: number;
};

const CustomPagination: React.FC<CustomPaginationProps> = ({ paginationModel, setPaginationModel, totalPages }) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPaginationModel({ ...paginationModel, page: value - 1 });
  };

  return (
    <Pagination
        count={totalPages}
        page={paginationModel.page + 1}
        onChange={handleChange}
        sx={{ bgcolor: 'white'}}
        shape="rounded"
    />
  );
};

export default CustomPagination;