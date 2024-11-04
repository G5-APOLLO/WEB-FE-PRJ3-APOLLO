/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Modal, Box, IconButton } from "@mui/material";
import { useGetClients } from "../hooks/useGetClients";
import { useToggleActive } from "../hooks/useToggleActive";
import ClienteDetalle from './ClienteDetalle'; // Importa el componente de detalles del cliente
import Spinner from "./Spinner";
import ErrorComponent from './Error-component';
import CloseIcon from '@mui/icons-material/Close';

function ClientTable() {
  const { data: clientsData, isError, isLoading } = useGetClients();
  const [clients, setClients] = useState(clientsData || []);
  const [openModal, setOpenModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

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

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nit", headerName: "NIT", width: 150 },
    { field: "name", headerName: "Name", width: 200, renderCell: (params) => (
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
          onClick={() => handleUpdate(params.row.id)}
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
      hideable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.row.active ? "error" : "success"}
          onClick={async () => {
            handleToggle(params.row.id, !params.row.active);
          }}
          className={`w-[7rem] ${params.row.active ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
        >
          {params.row.active ? "Deactivate" : "Activate"}
        </Button>
      ),
    },
  ];

  function handleUpdate(id: string) {
    console.log(`Update client with ID: ${id}`);
  }

  if (isLoading) return <Spinner/>;
  if (isError || error) return ErrorComponent({ message: error || 'Error loading clients' });

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-center text-6xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-black-500 to-gray-600 ">
        CLIENT LIST
      </h1>
      <div className="w-full">
        <DataGrid 
          columns={columns} 
          rows={clients || []} 
          style={{height: 'auto', width: '100%'}}
          getRowClassName={(params) => params.row.active ? '' : 'text-red-500 bg-red-100'}
          classes={{
            root: 'bg-white shadow-md rounded-lg',
            columnHeader: 'bg-gray-700 text-white shadow-lg border-b border-gray-700',
            row: 'hover:bg-gray-100',
          }}
        />
      </div>

      {/* Modal para el detalle del cliente */}
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
          {/* Botón de Cerrar */}
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <ClienteDetalle /*clientID={selectedClientId!}*/  />
        </Box>
      </Modal>
    </div>
  );
}

export default ClientTable;
