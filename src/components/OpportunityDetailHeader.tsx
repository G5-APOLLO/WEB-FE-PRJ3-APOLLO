import React from 'react';
import { useGetOpportunities } from '../hooks/useGetOpportunities';
import Spinner from './Spinner';
import ErrorComponent from './Error-component';

interface OpportunityDetailHeaderProps {
  opportunityId: number;
}

const OpportunityDetailHeader: React.FC<OpportunityDetailHeaderProps> = ({ opportunityId }) => {
  const { data: opportunities, isLoading, isError } = useGetOpportunities();
  const opportunity = opportunities?.find(op => op.id === opportunityId);

  if (isLoading) return <Spinner />;
  if (isError || !opportunity) return <ErrorComponent message="Opportunity not found" />;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Opportunity Details</h2>
      
      {/* Información de la oportunidad */}
      <div className="space-y-4">
        {/* Mostrar el ID de la oportunidad */}
        <div className="flex justify-between border-b pb-2">
          <p className="text-base font-medium text-gray-700"><strong>ID:</strong></p>
          <p className="text-base text-gray-600">{opportunity.id}</p>
        </div>
        
        <div className="flex justify-between border-b pb-2">
          <p className="text-base font-medium text-gray-700"><strong>Name:</strong></p>
          <p className="text-base text-gray-600">{opportunity.businessName}</p>
        </div>
        <div className="flex justify-between border-b pb-2">
          <p className="text-base font-medium text-gray-700"><strong>Business Line:</strong></p>
          <p className="text-base text-gray-600">{opportunity.businessLine}</p>
        </div>
        <div className="flex justify-between border-b pb-2">
          <p className="text-base font-medium text-gray-700"><strong>Description:</strong></p>
          <p className="text-base text-gray-600">{opportunity.description}</p>
        </div>
        <div className="flex justify-between border-b pb-2">
          <p className="text-base font-medium text-gray-700"><strong>Estimated Value:</strong></p>
          <p className="text-base text-gray-600">${opportunity.estimatedValue.toLocaleString()}</p>
        </div>
        <div className="flex justify-between border-b pb-2">
          <p className="text-base font-medium text-gray-700"><strong>Estimated Date:</strong></p>
          <p className="text-base text-gray-600">{opportunity.estimatedDate}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-base font-medium text-gray-700"><strong>Status:</strong></p>
          <p className={`text-base ${opportunity.status === 'Open' ? 'text-green-500' : 'text-red-500'}`}>
            {opportunity.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetailHeader;

