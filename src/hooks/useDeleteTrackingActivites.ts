import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTrackingActivity } from "../services/deleteTrackingActivites.service";

export const useDeleteTrackingActivity = (
  onSuccess: (deletedId: number) => void,
  onError: (error: Error) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (trackingId: number) => {
      await deleteTrackingActivity(trackingId);
      return trackingId;
    },
    onSuccess: (deletedId: number) => {
      queryClient.invalidateQueries({ queryKey: ['trackingActivities'] });
      if (onSuccess) onSuccess(deletedId);
    },
    onError: (error: Error) => {
      if (onError) onError(error);
    },
  });
};
