import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function HorizontalBarChart() {
  const data = {
    labels: ['Aluminum', 'Copper', 'Plastic', 'Wood', 'Iron'],
    datasets: [
      {
        label: 'Auction Listings',
        data: [150, 200, 100, 50, 75],
        backgroundColor: '#B87333'
      },
    ],
  };

  const options = {
    indexAxis: 'y', 
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Auction Listings by Category',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='ms-5'>
        <Card className='w-75'>
      <Card.Body>
        <Bar data={data} options={options} />
      </Card.Body>
    </Card>
    </div>
  );
}

export default HorizontalBarChart;
