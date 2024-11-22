import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useGetOpportunities } from '../hooks/useGetOpportunities';
import Spinner from './Spinner';
import ErrorComponent from './Error-component';

const OpportunitiesPieChart: React.FC = () => {
  const { data: opportunities, isLoading, isError } = useGetOpportunities();

  if (isLoading) return <Spinner />;
  if (isError || !opportunities) return <ErrorComponent message="Error fetching opportunities" />;

  // Agrupar las oportunidades por estado
  const statusCounts = opportunities.reduce((acc: Record<string, number>, opportunity) => {
    acc[opportunity.status] = (acc[opportunity.status] || 0) + 1;
    return acc;
  }, {});

  // Preparar datos para el gráfico
  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Opportunities by Status',
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)', // Azul claro
          'rgba(153, 102, 255, 0.5)', // Morado suave
          'rgba(75, 192, 192, 0.5)', // Verde azulado
          'rgba(201, 203, 207, 0.5)', // Gris claro
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)', // Azul claro
          'rgba(153, 102, 255, 1)', // Morado suave
          'rgba(75, 192, 192, 1)', // Verde azulado
          'rgba(201, 203, 207, 1)', // Gris claro
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
    },
    maintainAspectRatio: false, // Permite ajustar el tamaño
  };

  return (
    <div className="flex items-center justify-center">
      <div style={{ width: '400px', height: '400px' }}>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Opportunities by Status</h2>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default OpportunitiesPieChart;
