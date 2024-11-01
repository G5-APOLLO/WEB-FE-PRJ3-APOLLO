import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetClients } from "../hooks/useGetClients";

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
];

function ClientTable() {
  const { data: clients, isError, isLoading } = useGetClients();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading clients</p>;

  console.log(clients);

  return (
    <div>
      <h1 className="text-center text-2xl mt-10">Clients List</h1>
      <div style={{ width: '100%' }}>
        <DataGrid columns={columns} rows={clients || []} />
      </div>
    </div>
  );
}

export default ClientTable;