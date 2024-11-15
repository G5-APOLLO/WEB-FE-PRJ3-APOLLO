import { useState, useEffect } from 'react';
import { Button, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import Spinner from "./Spinner";
import ErrorComponent from './Error-component';
import { useGetTrackingActivities } from '../hooks/useGetTrackingActivities';
import CustomPagination from './CustomPagination';
import UpdateTrackingActivityModal from './UpdateTrackingActivityModal';

interface TrackingActivitiesTableProps {
  opportunityId?: number;
}

export interface TrackingActivity {
  id: number;
  opportunityId: number;
  opportunityName: string;
  contactType: string;
  contactDate: string;
  clientContact: string;
  salesExecutive: string;
  description: string;
}

function TrackingActivitiesTable({ opportunityId }: TrackingActivitiesTableProps) {
  const { data: activitiesData, isError, isLoading } = useGetTrackingActivities(opportunityId ?? 0);
  const [activities, setActivities] = useState<TrackingActivity[]>(activitiesData || []);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ pageSize: 10, page: 0 });
  const [selectedActivity, setSelectedActivity] = useState<TrackingActivity | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (activitiesData) {
      setActivities(activitiesData);
    }
  }, [activitiesData]);

  const handleOpenUpdateModal = (activity: TrackingActivity) => {
    setSelectedActivity(activity);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedActivity(null);
  };

  const handleActivityUpdated = (updatedActivity: TrackingActivity) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity
      )
    );
  };

  const handleDelete = (id: number) => {
    console.log(`Delete activity with ID: ${id}`);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'opportunityId',
      headerName: 'Opportunity ID',
      width: 150,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span>{params.value}</span>
        </Tooltip>
      )
    },
    {
      field: 'contactType',
      headerName: 'Contact Type',
      width: 150,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span>{params.value}</span>
        </Tooltip>
      )
    },
    {
      field: 'contactDate',
      headerName: 'Contact Date',
      width: 150,
    },
    {
      field: 'clientContact',
      headerName: 'Client Contact',
      width: 200,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span>{params.value}</span>
        </Tooltip>
      )
    },
    {
      field: 'salesExecutive',
      headerName: 'Sales Executive',
      width: 200,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span>{params.value}</span>
        </Tooltip>
      )
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span>{params.value.length > 30 ? `${params.value.slice(0, 30)}...` : params.value}</span>
        </Tooltip>
      )
    },
    {
      field: 'update',
      headerName: 'Update',
      width: 125,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenUpdateModal(params.row as TrackingActivity)}
        >
          Update
        </Button>
      ),
    },
    {
      field: "deleteAction",  
      headerName: "Delete",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const totalPages = Math.ceil(activities.length / paginationModel.pageSize);

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorComponent message="Error loading tracking activities" />;

  return (
    <div className="container mx-auto mt-10">
      <div className="w-full min-h-[10rem] max-h-[40rem] overflow-y-auto">
        <DataGrid
          columns={columns.map(column => column.field === 'id' ? { ...column, width: 65 } : { ...column, flex: 1 })}
          rows={activities || []}
          style={{ height: '100%', width: '100%' }}
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
      {selectedActivity && (
        <UpdateTrackingActivityModal
          open={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          activityId={selectedActivity.id}
          onActivityUpdated={handleActivityUpdated}
        />
      )}
    </div>
  );
}

export default TrackingActivitiesTable;
