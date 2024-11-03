import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetClients } from "../hooks/useGetClients";
import { Button } from "@mui/material";
import { useToggleActive } from "../hooks/useToggleActive";

function ClientTable() {
  const { data: clientsData, isError, isLoading } = useGetClients();
  const [clients, setClients] = useState(clientsData || []);
  
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

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nit", headerName: "NIT", width: 150 },
    { field: "name", headerName: "Name", width: 200 },
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

  if (isLoading) return <p className="text-center text-blue-500">Loading...</p>;
  if (isError || error) return <p className="text-center text-red-500">Error loading clients</p>;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-center text-6xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-black-500 to-gray-500 ">
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
            columnHeader: 'bg-gray-500 text-white font-bold',
            row: 'hover:bg-gray-100',
          }}
        />
      </div>
    </div>
  );
}

export default ClientTable;