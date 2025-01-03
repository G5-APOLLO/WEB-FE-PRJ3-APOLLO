import { useState, useEffect } from 'react';
import CustomPagination from './CustomPagination';
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Button, Modal, Box, IconButton } from "@mui/material";
import { useGetClients } from "../hooks/useGetClients";
import { useToggleActive } from "../hooks/useToggleActive";
import ClienteDetalle from './ClientDetail';
import CreateClientModal from './CreateClientModal';
import Spinner from "./Spinner";
import ErrorComponent from './Error-component';
import CloseIcon from '@mui/icons-material/Close';
import { ListClientType } from '../types/ListClient.type';
import UpdateClientModal from './UpdateClientModal';

function ClientTable() {
  const { data: clientsData, isError, isLoading } = useGetClients();
  const [clients, setClients] = useState(clientsData || []);
  const [openModal, setOpenModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ pageSize: 10, page: 0 });
  const [pageSize, setPageSize] = useState(10);


  useEffect(() => {
    if (clientsData) {
      setClients(clientsData);
    }
  }, [clientsData]);

  const updateClientState = (id: number, state: boolean) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === id ? { ...client, active: state } : client
      )
    );
  };

  const { toggleActive, error } = useToggleActive(updateClientState);

  const handleToggle = async (id: number, state: boolean) => {
    await toggleActive(id, state);
  };

  const handleNameClick = (id: number) => {
    setSelectedClientId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedClientId(null);
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleClientCreated = (newClient: ListClientType) => {
    setClients([...clients, newClient]);
  };

  const handleOpenUpdateModal = (id: number) => {
    setSelectedClientId(id);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedClientId(null);
  };

  const handleClientUpdated = (updatedClient: ListClientType) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
  };

  const totalPages = Math.ceil(clients.length / paginationModel.pageSize);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nit", headerName: "NIT", width: 150 },
    {
      field: "name", headerName: "Name", width: 200, renderCell: (params) => (
        <Button color="primary" onClick={() => handleNameClick(params.row.id)}>
          {params.row.name}
        </Button>
      ),
    },
    { field: "address", headerName: "Address", width: 250 },
    { field: "city", headerName: "City", width: 150 },
    { field: "country", headerName: "Country", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "active", headerName: "Active", width: 100, type: 'boolean' },
    {
      field: "update",
      headerName: "Update",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenUpdateModal(params.row.id)}
          disabled={!params.row.active}
        >
          Update
        </Button>
      ),
    },
    {
      field: "toggleActive",
      headerName: "Activate/Deactivate",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.row.active ? "error" : "success"}
          onClick={() => handleToggle(params.row.id, !params.row.active)}
          className='w-[7rem]'
        >
          {params.row.active ? "Desactivate" : "Activate"}
        </Button>
      ),
    },
  ];

  if (isLoading) return <Spinner />;
  if (isError || error) return <ErrorComponent message={error || 'Error loading clients'} />;


  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-start mb-8">
        <Button variant="contained" color="primary" onClick={handleOpenCreateModal}>
          New Client
        </Button>
      </div>


      <div className="w-full h-[40rem] overflow-y-auto">
        <DataGrid
          columns={columns.map(column => column.field === 'id' ? { ...column, width: 65 } : { ...column, flex: 1 })}
          rows={clients || []}
          style={{ height: '100%', width: '100%' }}
          getRowClassName={(params) => params.row.active ? '' : 'text-red-500 bg-red-100'}
          slots={{
            pagination: () => (
              <CustomPagination
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
                totalPages={totalPages}
              />
            ),
          }}
          pageSizeOptions={[10, 20, 50, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => {
            setPaginationModel({ ...model, page: 1 });
            setPageSize(pageSize);
          }}
          classes={{
            root: 'bg-white shadow-md rounded-lg',
            columnHeader: 'bg-gray-700 text-white shadow-lg border-b border-gray-700',
            row: 'hover:bg-gray-100',
          }}

        />
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: '80%',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
          <ClienteDetalle clientID={selectedClientId!} />
        </Box>
      </Modal>

      <CreateClientModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onClientCreated={handleClientCreated}
      />

      <UpdateClientModal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        clientId={selectedClientId!}
        onClientUpdated={handleClientUpdated}
      />
    </div>
  );
}

export default ClientTable;
