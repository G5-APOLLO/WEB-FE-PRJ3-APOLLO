import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Button, Tooltip } from "@mui/material";
import Spinner from "./Spinner";
import ErrorComponent from './Error-component';
import { useGetTrackingActivities } from '../hooks/useGetTrackingActivities';
import CustomPagination from './CustomPagination';

interface TrackingActivitiesTableProps {
    opportunityId?: number;
}

interface TrackingActivity {
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

    useEffect(() => {
        if (activitiesData) {
            setActivities(activitiesData);
        }
    }, [activitiesData]);

    const handleDelete = (id: number) => {
        console.log(`Delete activity with ID: ${id}`);
    };

    if (isLoading) return <Spinner />;
    if (isError) return <ErrorComponent message="Error loading tracking activities" />;

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        {
            field: "opportunityName",
            headerName: "Opportunity Name",
            width: 150,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            )
        },
        {
            field: "contactType",
            headerName: "Contact Type",
            width: 150,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            )
        },
        {
            field: "contactDate",
            headerName: "Contact Date",
            width: 150,
        },
        {
            field: "clientContact",
            headerName: "Client Contact",
            width: 200,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            )
        },
        {
            field: "salesExecutive",
            headerName: "Sales Executive",
            width: 200,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            )
        },
        {
            field: "description",
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

    const totalPages = Math.ceil(activities.length / paginationModel.pageSize);

    return (
        <div className="container mx-auto mt-10">
            <div className="w-full h-[40rem] overflow-y-auto">
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
        </div>
    );
}

export default TrackingActivitiesTable;
