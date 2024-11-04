import React from 'react';
import ClienteDetalleInferior from './ClienteDetalleInferior';

interface ClienteDetalleProps {
    clientID: number;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ClienteDetalle: React.FC<ClienteDetalleProps> = ({ clientID }) => {
    // Valores de prueba para la oportunidad seleccionada
    const oportunidadIdPrueba = 1;
    const nombreOportunidadPrueba = "Proyecto de Expansión";

    return (
        <div className="p-6 space-y-8 bg-gray-100 rounded-lg shadow-lg">

            {/* Renderiza la sección superior*/}


            {/* Renderiza la sección intermedia*/}


            {/* Renderiza la sección inferior*/}
            <ClienteDetalleInferior
                oportunidadId={oportunidadIdPrueba}
                nombreOportunidad={nombreOportunidadPrueba}
            />
        </div>
    );
};

export default ClienteDetalle;
