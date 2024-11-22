import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Plugin } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useGetOpportunities } from '../hooks/useGetOpportunities';
import Spinner from './Spinner';
import ErrorComponent from './Error-component';

// Register only the required global plugins
ChartJS.register(ArcElement, Tooltip, Legend);

const OpportunitiesByBusinessLineChart: React.FC = () => {
  const { data: opportunities, isLoading, isError } = useGetOpportunities();

  if (isLoading) return <Spinner />;
  if (isError || !opportunities) return <ErrorComponent message="Error fetching opportunities" />;

  // Group opportunities by business line
  const businessLineCounts = opportunities.reduce((acc: Record<string, number>, opportunity) => {
    acc[opportunity.businessLine] = (acc[opportunity.businessLine] || 0) + 1;
    return acc;
  }, {});

  // Calculate total opportunities
  const totalOpportunities = Object.values(businessLineCounts).reduce((sum, count) => sum + count, 0);

  // Calculate percentages
  const percentages = Object.keys(businessLineCounts).map((key) => ({
    line: key,
    count: businessLineCounts[key],
    percentage: ((businessLineCounts[key] / totalOpportunities) * 100).toFixed(2),
  }));

  // Prepare data for the chart
  const chartData = {
    labels: percentages.map((item) => item.line),
    datasets: [
      {
        label: 'Percentage of Opportunities by Business Line',
        data: percentages.map((item) => item.percentage),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)', // Red
          'rgba(54, 162, 235, 0.5)', // Blue
          'rgba(255, 206, 86, 0.5)', // Yellow
          'rgba(75, 192, 192, 0.5)', // Teal
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // Red
          'rgba(54, 162, 235, 1)', // Blue
          'rgba(255, 206, 86, 1)', // Yellow
          'rgba(75, 192, 192, 1)', // Teal
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
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const index = tooltipItem.dataIndex;
            const count = percentages[index].count;
            return `Count: ${count}`;
          },
        },
      },
      datalabels: {
        formatter: (value: number) => `${value}%`,
        color: '#fff',
        font: {
          size: 16,
        },
      },
    },
    maintainAspectRatio: false, // Adjust size
  };

  return (
    <div className="flex items-center justify-center">
      <div style={{ width: '400px', height: '400px' }}>
      <h2 className="text-2xl font-semibold mb-4 sm: mt-10 md:mt-0 text-gray-800 text-center">
          Opportunities by Business Line
        </h2>
        {/* Typescript shenanigans */}
        <Pie data={chartData} options={chartOptions} plugins={[ChartDataLabels as Plugin<'pie'>]} />
      </div>
    </div>
  );
};

export default OpportunitiesByBusinessLineChart;
