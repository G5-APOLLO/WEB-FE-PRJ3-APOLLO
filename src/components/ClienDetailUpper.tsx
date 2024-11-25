import React from 'react';
import { useClientData } from '../hooks/useClientData';
import Spinner from './Spinner';
import ErrorComponent from './Error-component';

interface ClienteDetalleSuperiorProps {
  clientId: number;
}

const ClienteDetalleSuperior: React.FC<ClienteDetalleSuperiorProps> = ({ clientId }) => {
  const { data: client, isLoading, isError } = useClientData(clientId);

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorComponent message="Error al cargar información del cliente" />;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Client Detail</h2>
      
      {/* Información del cliente */}
      <div className="space-y-4">
        <div className="flex justify-between border-b pb-2">
          <p className="text-base font-medium text-gray-700"><strong>NIT:</strong></p>
          <p className="text-base text-gray-600">{client.nit}</p>
        </div>
        <div className="flex justify-between border-b pb-2">
          <p className="text-base font-medium text-gray-700"><strong>Name:</strong></p>
          <p className="text-base text-gray-600">{client.name}</p>
        </div>
        <div className="flex justify-between border-b pb-2">
          <p className="text-base font-medium text-gray-700"><strong>Address:</strong></p>
          <p className="text-base text-gray-600">{client.address}</p>
        </div>
        <div className="flex justify-between border-b pb-2">
          <p className="text-base font-medium text-gray-700"><strong>City:</strong></p>
          <p className="text-base text-gray-600">{client.city}</p>
        </div>
        <div className="flex justify-between border-b pb-2">
          <p className="text-base font-medium text-gray-700"><strong>Country:</strong></p>
          <p className="text-base text-gray-600">{client.country}</p>
        </div>
        <div className="flex justify-between border-b pb-2">
          <p className="text-base font-medium text-gray-700"><strong>Phone:</strong></p>
          <p className="text-base text-gray-600">{client.phone}</p>
        </div>
        <div className="flex justify-between border-b pb-2">
          <p className="text-base font-medium text-gray-700"><strong>Email:</strong></p>
          <p className="text-base text-gray-600">{client.email}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-base font-medium text-gray-700"><strong>State:</strong></p>
          <p className={`text-base ${client.active ? 'text-green-500' : 'text-red-500'}`}>
            {client.active ? 'Active' : 'Inactive'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClienteDetalleSuperior;