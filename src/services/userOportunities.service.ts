import axios from 'axios';

const API_BASE_URL = 'https://web-fe-prj3-api-apollo.onrender.com';

export const clientsService = {
  getClients: async () => {
    const response = await axios.get(`${API_BASE_URL}/clients`);
    return response.data;
  }
};

export const opportunitiesService = {
  getOpportunities: async () => {
    const response = await axios.get(`${API_BASE_URL}/opportunities`);
    return response.data;
  }
};