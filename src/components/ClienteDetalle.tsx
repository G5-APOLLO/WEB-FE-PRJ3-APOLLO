import React, { useState } from 'react';
import OpportunitiesTable from './ListOpportunities'; 
import ClienteDetalleSuperior from './ClienteDetalleSuperior';
import TrackingActivitiesTable from './TrackingActivitiesTable';

interface ClienteDetalleProps {
    clientID: number;
}

const ClienteDetalle: React.FC<ClienteDetalleProps> = ({clientID}) => {
    // Valores de prueba para la oportunidad seleccionada
    const [selectedOpportunity, setSelectedOpportunity] = useState<{ id: number; name: string } | null>(null);

    const handleSeguimientoClick = (id: number, name: string) => {
        setSelectedOpportunity({ id, name });
      };
    
    return (
        <div className="p-6 space-y-8 bg-gray-100 rounded-lg shadow-lg">

            {/* Renderiza la sección superior*/}
            <ClienteDetalleSuperior clientId={clientID} />


            {/* Renderiza la sección intermedia*/}
            <div className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold">Client Opportunities:</h3>
            <OpportunitiesTable
                clientId={clientID}
                showSeguimiento
                onSeguimientoClick={handleSeguimientoClick}
            />
            </div>

            {/* Renderiza la sección inferior*/}
            {selectedOpportunity && (
                <TrackingActivitiesTable
                opportunityId={selectedOpportunity.id}
            />
         )}
        </div>
    );
};

export default ClienteDetalle;
