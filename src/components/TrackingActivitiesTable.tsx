import { useState, useEffect } from 'react';
import { Button, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import Spinner from "./Spinner";
import ErrorComponent from './Error-component';
import { useGetTrackingActivities } from '../hooks/useGetTrackingActivities';
import CustomPagination from './CustomPagination';
import UpdateTrackingActivityModal from './UpdateTrackingActivityModal';
import Swal from 'sweetalert2';
import { useDeleteTrackingActivity } from '../hooks/useDeleteTrackingActivites';
import { TrackingActivity } from '../types/TrackingActivity.type';
import CreateTrackingActivityModal from './CreateTrackingModal';

interface TrackingActivitiesTableProps {
  opportunityId?: number;
  showUpdateDelete?: boolean;
}

function TrackingActivitiesTable({ opportunityId, showUpdateDelete = true }: TrackingActivitiesTableProps) {
  const { data: activitiesData, isError, isLoading } = useGetTrackingActivities(opportunityId ?? 0);
  const [activities, setActivities] = useState<TrackingActivity[]>(activitiesData || []);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ pageSize: 10, page: 0 });
  const [selectedActivity, setSelectedActivity] = useState<TrackingActivity | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { mutate: deleteTrackingActivity } = useDeleteTrackingActivity(
    (deletedId) => {
      // Success handling: update component state
      setActivities((prevActivities) => prevActivities.filter((activity) => activity.id !== deletedId));
      Swal.fire('Deleted!', 'The activity has been deleted.', 'success');
    },
    () => {
      // Error handling: display error message
      Swal.fire('Error', 'There was an issue deleting the activity.', 'error');
    }
  );

  useEffect(() => {
    if (activitiesData) {
      setActivities(activitiesData);
    }
  }, [activitiesData]);

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  const handleActivityCreated = (newActivity: TrackingActivity) => {
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };

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

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete this activity!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      deleteTrackingActivity(id);
    }
  };

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorComponent message="Error loading tracking activities" />;

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
    ...(showUpdateDelete
      ? [
        {
          field: 'update',
          headerName: 'Update',
          width: 125,
          renderCell: (params: any) => (
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
          renderCell: (params: any) => (
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
          ),
        },
      ]
      : []),
  ];

  const totalPages = Math.ceil(activities.length / paginationModel.pageSize);

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorComponent message="Error loading tracking activities" />;

  return (
    <div className="container mx-auto mt-10">
      {showUpdateDelete && <div className="flex justify-between mb-4">
        <Button variant="contained" color="primary" onClick={handleOpenCreateModal}>
          Create Tracking
        </Button>
      </div>
      }
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
      <CreateTrackingActivityModal
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onCreateSuccess={handleActivityCreated}
      />
    </div>
  );
}

export default TrackingActivitiesTable;
