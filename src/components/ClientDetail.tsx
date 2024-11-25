import React, { useState } from 'react';
import OpportunitiesTable from './ListOpportunities';
import ClienteDetalleSuperior from './ClienDetailUpper';
import TrackingActivitiesTable from './TrackingActivitiesTable';
import ContactList from './ContactList'; // Importar el nuevo componente
import { useClientData } from '../hooks/useClientData'; // Importar el hook

interface ClienteDetalleProps {
  clientID: number;
}

const ClienteDetalle: React.FC<ClienteDetalleProps> = ({ clientID }) => {
  // Estado para la oportunidad seleccionada
  const [selectedOpportunity, setSelectedOpportunity] = useState<{ id: number; name: string } | null>(null);

  // Obtener los datos del cliente utilizando el hook personalizado
  const { data: client, isLoading, isError } = useClientData(clientID);

  // Función para manejar clics en oportunidades
  const handleSeguimientoClick = (id: number, name: string) => {
    setSelectedOpportunity({ id, name });
  };

  // Manejo de carga y errores
  if (isLoading) return <p>Cargando...</p>;
  if (isError || !client) return <p>Error al cargar información del cliente</p>;

  return (
    <div className="p-6 space-y-8 bg-gray-100 rounded-lg shadow-lg">
      {/* Renderiza la sección superior */}
      <ClienteDetalleSuperior clientId={clientID} />

      {/* Renderiza la lista de contactos asociados */}
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold">Associated Contacts:</h3>
        <ContactList contactIds={client.contacts} />
      </div>

      {/* Renderiza la sección intermedia */}
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold">Client Opportunities:</h3>
        <OpportunitiesTable
          clientId={clientID}
          showSeguimiento
          onSeguimientoClick={handleSeguimientoClick}
        />
      </div>

      {/* Renderiza la sección inferior */}
      {selectedOpportunity && (
        <TrackingActivitiesTable 
        opportunityId={selectedOpportunity.id} 
        showUpdateDelete= {false}/>
      )}
    </div>
  );
};

export default ClienteDetalle;
