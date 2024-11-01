import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetClients } from "../hooks/useGetClients";
import { Button } from "@mui/material";

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
        color="secondary"
        onClick={() => handleToggleActive(params.row.id, params.row.active)}
      >
        {params.row.active ? "Deactivate" : "Activate"}
      </Button>
    ),
  },
  ];
  
  function handleUpdate(id: string) {
    console.log(`Update client with ID: ${id}`);
  }
  
  function handleToggleActive(id: string, isActive: boolean) {
    console.log(`${isActive ? "Deactivate" : "Activate"} client with ID: ${id}`);
  }


function ClientTable() {
  const { data: clients, isError, isLoading } = useGetClients();

  if (isLoading) return <p className="text-center text-blue-500">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading clients</p>;

  console.log(clients);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-center text-2xl font-bold mb-5">Clients List</h1>
      <div className="w-full">
        <DataGrid 
          columns={columns} 
          rows={clients || []}
          style={{height: 'auto', width: '100%'}}
        />
      </div>
    </div>
  );
}

export default ClientTable;