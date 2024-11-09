import React, { useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Button, Tooltip } from "@mui/material";
import Spinner from "./Spinner";
import ErrorComponent from './Error-component';
import { useGetTrackingActivities } from '../hooks/useGetTrackingActivities';
import CustomPagination from './CustomPagination';


interface TrackingActivitiesTableProps {
    oportunidadId?: number;
}

interface TrackingActivity {
    id: number;
    oportunidadId: number;
    tipoContacto: string; // "Call", "Email", "In-Person Meeting"
    fechaContacto: string; // "YYYY-MM-DD"
    clienteContacto: string; // Nombre del contacto asociado al cliente
    ejecutivoComercial: string; // Nombre del ejecutivo comercial
    descripcion: string; // Conclusiones de la actividad
}

function TrackingActivitiesTable({ oportunidadId }: TrackingActivitiesTableProps) {
    const { data: activitiesData, isError, isLoading } = useGetTrackingActivities(oportunidadId ?? 0);
    const [activities, setActivities] = useState<TrackingActivity[]>(activitiesData || []);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ pageSize: 10, page: 0 });


    // Actualizar el estado cuando se reciben nuevos datos
    React.useEffect(() => {
        if (activitiesData) {
            setActivities(activitiesData);
        }
    }, [activitiesData]);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        {
            field: "tipoContacto",
            headerName: "Contact Type",
            width: 150,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            )
        },
        {
            field: "fechaContacto",
            headerName: "Contact Date",
            width: 150,
            type: 'date',
            valueGetter: (params: { value: string }) => new Date(params.value)
        },
        {
            field: "clienteContacto",
            headerName: "Contact Client",
            width: 200,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            )
        },
        {
            field: "ejecutivoComercial",
            headerName: "Commercial Executive",
            width: 200,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            )
        },
        {
            field: "descripcion",
            headerName: "Description",
            width: 300,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value.length > 30 ? `${params.value.slice(0, 30)}...` : params.value}</span>
                </Tooltip>
            )
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => (
                <div className="flex space-x-2">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => console.log(`Update activity with ID: ${params.row.id}`)}
                    >
                        Update
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const handleDelete = (id: number) => {
        // Implementar lógica de eliminación aquí
        console.log(`Delete activity with ID: ${id}`);
        // Por ejemplo, podrías hacer una llamada al API para eliminar la actividad
    };

    if (isLoading) return <Spinner />;
    if (isError) return <ErrorComponent message="Error loading tracking activities" />;

    const totalPages = Math.ceil(activities.length / paginationModel.pageSize);


    return (
        <div className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Tracking Activities</h3>
            <div className="w-full h-[30rem]">
                <DataGrid
                    columns={columns}
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
        </div>
    );
}

export default TrackingActivitiesTable;
