import { BASE_URL } from "./api.service";

export const deleteTrackingActivity = async (trackingId: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/trackingactivities/${trackingId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error deleting tracking activity');
  }
};
