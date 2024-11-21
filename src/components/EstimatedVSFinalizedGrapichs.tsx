import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { ChartData } from "chart.js";
import axios from "axios";
import { Container, TextField, Autocomplete } from "@mui/material";

export const EstimatedVSFinalized: React.FC = () => {
  const [clients, setClients] = useState<{ id: number; name: string }[]>([]);
  const [selectedClients, setSelectedClients] = useState<{ id: number; name: string }[]>([]);
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsResponse = await axios.get('https://web-fe-prj3-api-apollo.onrender.com/clients');
        const opportunitiesResponse = await axios.get('https://web-fe-prj3-api-apollo.onrender.com/opportunities');

        const clients = clientsResponse.data;
        const opportunities = opportunitiesResponse.data;

        setClients(clients);

        interface Client {
          id: number;
          name: string;
        }

        interface Opportunity {
          clientIds: number[];
          estimatedValue: number;
          status: string;
        }

        const filteredClients: Client[] = selectedClients.length > 0
          ? clients.filter((client: Client) => selectedClients.some(selectedClient => selectedClient.name === client.name))
          : clients;

        const data = filteredClients.map((client) => {
          const clientOpportunities: Opportunity[] = opportunities.filter((opportunity: Opportunity) => opportunity.clientIds.includes(client.id));
          const estimatedTotal = clientOpportunities.reduce((sum, opp) => sum + opp.estimatedValue, 0);
          const executedTotal = clientOpportunities
            .filter((opp) => opp.status === 'Finalized')
            .reduce((sum, opp) => sum + opp.estimatedValue, 0);

          return {
            client: client.name,
            estimatedTotal,
            executedTotal,
          };
        });

        setChartData({
          labels: data.map((client) => client.client),
          datasets: [
            {
              label: 'Estimated Total',
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
              data: data.map((client) => client.estimatedTotal),
            },
            {
              label: 'Executed Total',
              backgroundColor: 'rgba(153,102,255,0.2)',
              borderColor: 'rgba(153,102,255,1)',
              borderWidth: 1,
              data: data.map((client) => client.executedTotal),
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, [selectedClients]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const,
            },
            title: {
              display: true,
              text: 'Estimated vs Executed Total by Client',
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Clients',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Total Value',
              },
              ticks: {
                callback: function(value) {
                  return `$${value.toLocaleString()}`;
                }
              }
            },
          },
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <Container>
      <Autocomplete
        multiple
        options={clients}
        getOptionLabel={(option) => option.name}
        value={selectedClients}
        onChange={(_, newValue) => setSelectedClients(newValue)}
        renderInput={(params) => <TextField {...params} label="Clients" variant="outlined" />}
        fullWidth
      />
        <canvas id="myChart"></canvas>
    </Container>
  );
};

export default EstimatedVSFinalized;
