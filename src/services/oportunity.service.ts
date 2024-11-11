import { IOpportunity } from '../types/ListOpportunity.type';

export const fetchOpportunityById = async (id: number): Promise<IOpportunity> => {

  const response = await fetch(`https://web-fe-prj3-api-apollo.onrender.com/opportunities/${id}`);
  if (!response.ok) {
    throw new Error('Error fetching opportunity');
  }
  return response.json();
};

export const updateOpportunity = async (opportunity: IOpportunity): Promise<IOpportunity> => {

  const response = await fetch(`https://web-fe-prj3-api-apollo.onrender.com/opportunities/${opportunity.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(opportunity),
  });
  if (!response.ok) {
    throw new Error('Error updating opportunity');
  }
  return response.json();
};

// opportunityService.ts
export const deleteOpportunityAndTracking = async (id: number): Promise<void> => {
  // Elimina la oportunidad
  console.log(id)
  const response = await fetch(`https://web-fe-prj3-api-apollo.onrender.com/opportunities/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error deleting opportunity');
  }

  // Elimina las actividades de seguimiento asociadas
  // const trackingResponse = await fetch(`https://web-fe-prj3-api-apollo.onrender.com/Trackingactivities?opportunityId=${id}`, {
  //   method: 'DELETE',
  // });
  // if (!trackingResponse.ok) {
  //   throw new Error('Error deleting tracking activities');
  // }
};
