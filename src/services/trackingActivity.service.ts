// trackingActivity.service.ts
import axios from "axios";
import { TrackingActivity } from "../types/TrackingActivity.type";
import { IOpportunity } from "../types/ListOpportunity.type";

const API_URL = "https://web-fe-prj3-api-apollo.onrender.com";

export const fetchTrackingActivityById = async (
  id: number
): Promise<TrackingActivity> => {
  const response = await fetch(
    `https://web-fe-prj3-api-apollo.onrender.com/Trackingactivities/${id}`
  );
  if (!response.ok) {
    throw new Error("Error fetching tracking activity");
  }
  return response.json();
};

export const updateTrackingActivity = async (
  activity: TrackingActivity
): Promise<TrackingActivity> => {
  const response = await fetch(
    `https://web-fe-prj3-api-apollo.onrender.com/Trackingactivities/${activity.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activity),
    }
  );
  if (!response.ok) {
    throw new Error("Error updating tracking activity");
  }
  return response.json();
};

export const deleteTrackingActivity = async (id: number): Promise<void> => {
  const response = await fetch(
    `https://web-fe-prj3-api-apollo.onrender.com/Trackingactivities/${id}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Error deleting tracking activity");
  }
};

export const createTrackingActivity = async (
  trackingActivity: Omit<TrackingActivity, "id">
): Promise<TrackingActivity> => {
  try {
    const response = await axios.post(
      `${API_URL}/trackingActivities`,
      trackingActivity
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear la actividad de seguimiento:", error);
    throw error;
  }
};

export const fetchOpportunityByName = async (
  name: string
): Promise<IOpportunity | null> => {
  try {
    const response = await axios.get<IOpportunity[]>(
      `${API_URL}/opportunities`
    );

    const normalizedName = name.toLowerCase().replace(/\s+/g, " ").trim();

    const matchingOpportunity = response.data.find((opportunity) => {
      const normalizedOpportunityName = opportunity.businessName
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
      return normalizedOpportunityName.includes(normalizedName);
    });

    return matchingOpportunity || null;
  } catch (error) {
    console.error("Error fetching opportunity by name:", error);
    throw new Error("Error fetching opportunity by name");
  }
};
