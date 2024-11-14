import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTrackingActivity } from "../services/deleteTrackingActivites.service";

export const useDeleteTrackingActivity = (onSuccess: (deletedId: number) => void) => {
    const queryClient = useQueryClient();
  
    return useMutation({
        mutationFn: async (trackingId: number) => {
            await deleteTrackingActivity(trackingId);
            return trackingId; 
        },
        onSuccess: (deletedId: number) => {
            // Invalidate the query to refresh data
            queryClient.invalidateQueries({ queryKey: ['trackingActivities'] });
            if (onSuccess) onSuccess(deletedId);  // Pass deletedId to onSuccess callback
        },
    });
};
