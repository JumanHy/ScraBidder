// LineChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';

// Import Chart.js modules and register them
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'registered users',
        data: [10, 20, 30, 40, 50, 60, 70],
        fill: false,
        borderColor: '#B87333',
        backgroundColor: '#B87333',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'monthly user growth',
      },
    },
  };

  return (
    <Line data={data} options={options} />
  );
};

export default LineChart;
