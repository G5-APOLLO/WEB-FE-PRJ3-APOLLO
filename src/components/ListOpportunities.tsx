import { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Button, Tooltip } from "@mui/material";
import Spinner from "./Spinner";
import ErrorComponent from './Error-component';
import { useGetOpportunities } from '../hooks/useGetOpportunities';
import { formatCurrency } from '../utils/formatCurrency';
import UpdateOpportunityModal from './UpdateOpportunityModal';
import { IOpportunity } from '../types/ListOpportunity.type';
import CustomPagination from './CustomPagination';

interface OpportunitiesTableProps {
  clientId?: number;
  showSeguimiento?: boolean;
  onSeguimientoClick?: (id: number, name: string) => void;
}

function OpportunitiesTable({ clientId, showSeguimiento = false, onSeguimientoClick }: OpportunitiesTableProps) {
  const { data: opportunityData, isError, isLoading } = useGetOpportunities(clientId);
  const [opportunities, setOpportunities] = useState(opportunityData || []);
  const [selectedOpportunity, setSelectedOpportunity] = useState<IOpportunity | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ pageSize: 10, page: 0 });

  const handleOpenUpdateModal = (opportunity: IOpportunity) => {
    setSelectedOpportunity(opportunity);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedOpportunity(null);
  };

  const handleOpportunityUpdated = (updatedOpportunity: IOpportunity) => {
    setOpportunities((prevOpportunities) =>
      prevOpportunities.map((opp) =>
        opp.id === updatedOpportunity.id ? updatedOpportunity : opp
      )
    );
  };

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
      width: 125,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenUpdateModal(params.row as IOpportunity)}
        >
          Update
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 125,
      renderCell: () => (
        <Button
          variant="contained"
          color="error"
          onClick={() => {}}
        >
          Delete
        </Button>
      )
    }, ...(showSeguimiento
      ? [{
          field: "Tracking",
          headerName: "Tracking",
          hideable: false,
          width: 150,
          renderCell: (params: any ) => (
            <Button
              variant="contained"
              color="primary"
              onClick={() => onSeguimientoClick && onSeguimientoClick(params.row.id, params.row.businessName)}
            >
              Tracking
            </Button>
          ),
        }]
      : [])
  ];

  if (isLoading) return <Spinner/>;
  if (isError) return <ErrorComponent message='Error loading Opportunities' />;

  const totalPages = Math.ceil(opportunities.length / paginationModel.pageSize);

  return (
    <div className="container mx-auto mt-10">
      <div className="w-full h-[40rem] overflow-y-auto">
        <DataGrid 
          columns={columns.map(column => column.field === 'id' ? { ...column, width: 65  } : { ...column, flex: 1 })} 
          rows={opportunities || []} 
          style={{height: '100%', width: '100%'}}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 20, 50, 100]}
          slots={{
            pagination: () => (
              <CustomPagination 
                paginationModel={paginationModel} 
                setPaginationModel={setPaginationModel} 
                totalPages={totalPages} 
              />
            ),
          }}
          classes={{
            root: 'bg-white shadow-md rounded-lg',
            columnHeader: 'bg-gray-700 text-white shadow-lg border-b border-gray-700',
            row: 'hover:bg-gray-100',
          }}
        />
      </div>
      <UpdateOpportunityModal
        open={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        opportunityId={selectedOpportunity ? selectedOpportunity.id : undefined}
        onOpportunityUpdated={handleOpportunityUpdated}
      />
    </div>
  );
}

export default OpportunitiesTable;