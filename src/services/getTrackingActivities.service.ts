export const fetchTrackingActivities = async (oportunidadId: number) => {
  const url = oportunidadId === 0 
    ? 'https://web-fe-prj3-api-apollo.onrender.com/actividadesSeguimiento'
    : `https://web-fe-prj3-api-apollo.onrender.com/actividadesSeguimiento?oportunidadId=${oportunidadId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error al cargar las actividades de seguimiento');
  }
  return response.json();
};
