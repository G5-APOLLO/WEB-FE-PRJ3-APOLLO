// hooks/useCreateTrackingActivity.ts
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { createTrackingActivity, fetchOpportunityByName } from '../services/trackingActivity.service';
import { TrackingActivity } from '../types/TrackingActivity.type';

export const useCreateTrackingActivity = (onClose: () => void) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(createTrackingActivity, {
    onSuccess: () => {
      queryClient.invalidateQueries('trackingActivities');
      toast.success("Activity created successfully!");
      onClose(); 
    },
    onError: () => {
      toast.error("Failed to create activity.");
    },
  });

  const createActivity = async (activity: TrackingActivity) => {
    try {
      const opportunity = await fetchOpportunityByName(activity.opportunityName);
      
      if (!opportunity) {
        toast.error("Opportunity not found.");
        return;
      }

      const activityWithId = { ...activity, opportunityId: opportunity.id };
      
      mutation.mutate(activityWithId);
    } catch {
      toast.error("Error fetching opportunity ID.");
    }
  };

  return { createActivity, isLoading: mutation.isLoading };
};
