import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const TrafficChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Registered Users",
        backgroundColor: "#B87333",
        borderColor: "#B87333",
        hoverBackgroundColor: "#DFA56F",
        hoverBorderColor: "#DFA56F",
        data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
        barPercentage: 0.75,
        categoryPercentage: 0.5
      },
      {
        label: "Guists",
        backgroundColor: "#dee2e6",
        borderColor: "#dee2e6",
        hoverBackgroundColor: "#dee2e6",
        hoverBorderColor: "#dee2e6",
        data: [69, 66, 24, 48, 52, 51, 44, 53, 62, 79, 51, 68],
        barPercentage: 0.75,
        categoryPercentage: 0.5
      }
    ]
  };

  const options = {
    scales: {
      y: {
        grid: {
          display: false
        },
        stacked: false
      },
      x: {
        grid: {
          color: "transparent"
        },
        stacked: false
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default TrafficChart;
