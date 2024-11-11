// LeadsLineChart.js
import React from 'react';
// import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LeadsLineChart = ({ leadsData,countData }) => {
  // Define the data for the chart
  const data = {
    labels: leadsData.map((dataPoint) => dataPoint.time), // Extracting time for X-axis
    datasets: [
      {
        label: 'Leads Today',
        data: leadsData.map((dataPoint) => dataPoint.count), // Extracting lead count for Y-axis
        fill: false,
        backgroundColor: '#5C55EC',
        borderColor: '#5C55EC',
        borderWidth: 2,
        tension: 0.1, // Smooth curves
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Leads Over Time (Today)',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Leads',
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LeadsLineChart;
