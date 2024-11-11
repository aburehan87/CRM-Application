import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  // Data for the leads: 20 leads for the day and 80 remaining leads
  const data = {
    labels: ['Leads Today', 'Other Leads'],
    datasets: [
      {
        label: 'Leads Distribution',
        data: [20, 80], // 20 leads today, 80 other leads
        backgroundColor: ['#FF6384', '#36A2EB'], // Colors for the sections
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
