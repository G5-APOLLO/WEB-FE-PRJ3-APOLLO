import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Tooltip } from "@mui/material";
import Spinner from "./Spinner";
import ErrorComponent from './Error-component';
import { useGetOpportunities } from '../hooks/useGetOpportunities';
import { formatCurrency } from '../utils/formatCurrency';

interface OpportunitiesTableProps {
    clientId?: number;
}
function OpportunitiesTable({ clientId }: OpportunitiesTableProps) {
  const { data: opportunityData, isError, isLoading } = useGetOpportunities(clientId);
  const [opportunities, setOpportunities] = useState(opportunityData || []);
  
  useEffect(() => {
    if (opportunityData) {
        setOpportunities(opportunityData);
    }
  }, [opportunityData]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { 
        field: "clientIds", 
        headerName: "Clients", 
        width: 150,
        renderCell: (params) => {
          const clientIds = Array.isArray(params.value) ? params.value.join(', ') : params.value;
          return (
            <Tooltip title={clientIds}>
              <span>{clientIds.length > 20 ? `${clientIds.slice(0, 20)}...` : clientIds}</span>
            </Tooltip>
          );
        }
    },
    { 
        field: "businessName", 
        headerName: "Business Name", 
        width: 200,
        renderCell: (params) => (
          <Tooltip title={params.value}>
            <span>{params.value.length > 20 ? `${params.value.slice(0, 20)}...` : params.value}</span>
          </Tooltip>
        )
    },
    { field: "businessLine", headerName: "Business Line", width: 200 },
    { 
        field: "description", 
        headerName: "Description", 
        width: 150,
        renderCell: (params) => (
          <Tooltip title={params.value}>
            <span>{params.value.length > 20 ? `${params.value.slice(0, 20)}...` : params.value}</span>
          </Tooltip>
        )
    },
    {
        field: "estimatedValue",
        headerName: "Estimated Value",
        width: 150,
        renderCell: (params) => formatCurrency(params.value),
    },
    { field: "estimatedDate", headerName: "Estimated Date", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "update",
      headerName: "Update",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {}}
        >
          Update
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => {}}
        >
          Delete
        </Button>
      )}
  ];

  if (isLoading) return <Spinner/>;
  if (isError) return ErrorComponent({ message:'Error loading Opportunities' });

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-center text-6xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-black-500 to-gray-600 ">
  OPPORTUNITIES LIST
</h1>
      <div className="w-full">
	<DataGrid 
          columns={columns} 
          rows={opportunities || []} 
          style={{height: 'auto', width: '100%'}}
          classes={{
            root: 'bg-white shadow-md rounded-lg',
            columnHeader: 'bg-gray-700 text-white shadow-lg border-b border-gray-700',
            row: 'hover:bg-gray-100',
          }}
        />
      </div>
    </div>
  );
}

export default OpportunitiesTable;