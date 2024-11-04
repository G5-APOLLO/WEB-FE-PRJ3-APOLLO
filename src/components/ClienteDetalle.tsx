import React from 'react';
import ClienteDetalleInferior from './ClienteDetalleInferior';
import OpportunitiesTable from './ListOpportunities'; 

interface ClienteDetalleProps {
    clientID: number;
}

const ClienteDetalle: React.FC<ClienteDetalleProps> = ({clientID}) => {
    // Valores de prueba para la oportunidad seleccionada
    const oportunidadIdPrueba = 1;
    const nombreOportunidadPrueba = "Proyecto de Expansión";
    console.log(clientID)

    return (
        <div className="p-6 space-y-8 bg-gray-100 rounded-lg shadow-lg">

            {/* Renderiza la sección superior*/}


            {/* Renderiza la sección intermedia*/}
            <div className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold">Client Opportunities:</h3>
            <OpportunitiesTable
                clientId={clientID}
                showSeguimiento
            />
            </div>

            {/* Renderiza la sección inferior*/}
            <ClienteDetalleInferior
                oportunidadId={oportunidadIdPrueba}
                nombreOportunidad={nombreOportunidadPrueba}
            />
        </div>
    );
};

export default ClienteDetalle;
