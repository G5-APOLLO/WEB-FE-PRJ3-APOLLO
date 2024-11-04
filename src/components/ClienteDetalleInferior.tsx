import React from 'react';
import { useActividadesSeguimiento } from '../hooks/useActivity';
import Spinner from './Spinner';
import ErrorComponent from './Error-component';

interface Actividad {
    id: number;
    descripcion: string;
    fecha: string;
}

interface ClienteDetalleInferiorProps {
    oportunidadId: number;
    nombreOportunidad: string;
}

const ClienteDetalleInferior: React.FC<ClienteDetalleInferiorProps> = ({ oportunidadId, nombreOportunidad }) => {
    const { data: actividades, isLoading, isError } = useActividadesSeguimiento(oportunidadId);

    if (isLoading) return <Spinner />;
    if (isError) return <ErrorComponent message='Error al cargar actividades'/>;

    return (
        <div className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Actividades de Seguimiento para: {nombreOportunidad}</h3>
            <table className="min-w-full text-sm text-left border-collapse">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Fecha</th>
                        <th className="px-4 py-2 border">Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {actividades.map((actividad: Actividad) => (
                        <tr key={actividad.id}>
                            <td className="px-4 py-2 border">{actividad.fecha}</td>
                            <td className="px-4 py-2 border">{actividad.descripcion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClienteDetalleInferior;
