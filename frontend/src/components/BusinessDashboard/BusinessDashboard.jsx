import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dashboardCardStyle = {
    backgroundColor: '#f4f4f4',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    flex: '1 1 180px', // Make cards more responsive
    fontSize: '14px',
    lineHeight: '1.3',
  };

  const flexContainerStyle = {
    display: 'flex',
    gap: '20px',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // Allow cards and charts to wrap on smaller screens
  };

  const headerStyle = {
    color: '#b87333',
    fontSize: '16px',
    marginBottom: '10px',
  };

  // Sales Bar Chart data and options
  const salesChartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales (Items Sold)',
        data: [100, 150, 180, 220, 250],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const salesChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Earnings Line Chart data and options
  const earningsChartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Earnings ($)',
        data: [1200, 1800, 2200, 2600, 3000],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const earningsChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Style for the chart containers
  const chartContainerStyle = {
    backgroundColor: '#f4f4f4',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    flex: '1 1 300px', // Adjust to take more space on smaller screens
    height: 'auto', // Allows height to adjust based on chart content
    marginTop: '20px',
  };

  return (
    <div>
      {/* Dashboard Cards */}
      <div style={flexContainerStyle}>
        <div style={dashboardCardStyle}>
          <h4 style={headerStyle}>Total Watchlist Items</h4>
          <p>12 items</p>
        </div>
        <div style={dashboardCardStyle}>
          <h4 style={headerStyle}>Total Transactions</h4>
          <p>35 transactions</p>
        </div>
        <div style={dashboardCardStyle}>
          <h4 style={headerStyle}>New Bids</h4>
          <p>5 active bids</p>
        </div>
        <div style={dashboardCardStyle}>
          <h4 style={headerStyle}>Notifications</h4>
          <p>3 new alerts</p>
        </div>
        <div style={dashboardCardStyle}>
          <h4 style={headerStyle}>Total Revenue</h4>
          <p>$7,250</p>
        </div>
      </div>

      {/* Sales and Earnings Charts (Side by Side) */}
      <div style={flexContainerStyle}>
        {/* Sales Chart */}
        <div style={chartContainerStyle}>
          <h4 style={headerStyle}>Sales Over Time</h4>
          <Bar data={salesChartData} options={salesChartOptions} />
        </div>

        {/* Earnings Chart */}
        <div style={chartContainerStyle}>
          <h4 style={headerStyle}>Earnings Over Time</h4>
          <Line data={earningsChartData} options={earningsChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
