export const fetchActividadesSeguimiento = async (oportunidadId: number) => {
  const response = await fetch(`https://web-fe-prj3-api-apollo.onrender.com/actividadesSeguimiento?oportunidadId=${oportunidadId}`);
  if (!response.ok) {
    throw new Error('Error al cargar las actividades de seguimiento');
  }
  return response.json();
};
