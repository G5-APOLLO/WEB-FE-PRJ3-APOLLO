import React from 'react';
import TrackingActivitiesTable from './TrackingActivitiesTable';

interface OpportunityDetailProps {
    opportunityId: number;
}

const OpportunityDetail: React.FC<OpportunityDetailProps> = ({opportunityId}) => {
    
    return (
        <div className="p-6 space-y-8 bg-gray-100 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Tracking:</h3>

            {/* Renderiza la sección inferior*/}
                <TrackingActivitiesTable
                opportunityId={opportunityId}
            />

        </div>
    );
};

export default OpportunityDetail;
