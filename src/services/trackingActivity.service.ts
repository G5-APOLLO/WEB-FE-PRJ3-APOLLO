// trackingActivity.service.ts

export interface TrackingActivity {
  id: number;
  opportunityId: number;
  opportunityName: string;
  contactType: string;
  contactDate: string;
  clientContact: string;
  salesExecutive: string;
  description: string;
}

export const fetchTrackingActivityById = async (id: number): Promise<TrackingActivity> => {
  const response = await fetch(`https://web-fe-prj3-api-apollo.onrender.com/Trackingactivities/${id}`);
  if (!response.ok) {
    throw new Error('Error fetching tracking activity');
  }
  return response.json();
};

export const updateTrackingActivity = async (activity: TrackingActivity): Promise<TrackingActivity> => {
  const response = await fetch(`https://web-fe-prj3-api-apollo.onrender.com/Trackingactivities/${activity.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(activity),
  });
  if (!response.ok) {
    throw new Error('Error updating tracking activity');
  }
  return response.json();
};

export const deleteTrackingActivity = async (id: number): Promise<void> => {
  const response = await fetch(`https://web-fe-prj3-api-apollo.onrender.com/Trackingactivities/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error deleting tracking activity');
  }
};