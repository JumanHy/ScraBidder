import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    revenueOverTime: [],
    itemsSoldOverTime: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data using axios
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5192/api/Dashboard/seller-dashboard/${localStorage.getItem(
            "userId"
          )}`
        );
        console.log(response.data);
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const dashboardCardStyle = {
    backgroundColor: "#f4f4f4",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    flex: "1 1 180px", // Make cards more responsive
    fontSize: "14px",
    lineHeight: "1.3",
  };

  const flexContainerStyle = {
    display: "flex",
    gap: "20px",
    justifyContent: "space-between",
    flexWrap: "wrap", // Allow cards and charts to wrap on smaller screens
  };

  const headerStyle = {
    color: "#b87333",
    fontSize: "16px",
    marginBottom: "10px",
  };

  // Prepare data for charts
  const revenueOverTimeData = {
    labels: dashboardData.revenueOverTime.map((item) => item.period),
    datasets: [
      {
        label: "Revenue ($)",
        data: dashboardData.revenueOverTime.map((item) => item.totalAmount),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const salesOverTimeData = {
    labels: dashboardData.itemsSoldOverTime.map((item) => item.period),
    datasets: [
      {
        label: "Sales (Items Sold)",
        data: dashboardData.itemsSoldOverTime.map((item) => item.totalCount),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const chartContainerStyle = {
    backgroundColor: "#f4f4f4",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    flex: "1 1 300px",
    height: "auto",
    marginTop: "20px",
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Dashboard Cards */}
          <div style={flexContainerStyle}>
            <div style={dashboardCardStyle}>
              <h4 style={headerStyle}>Total Revenue</h4>
              <p>${dashboardData.totalRevenue.toFixed(2)}</p>
            </div>
          </div>

          {/* Sales and Earnings Charts */}
          <div style={flexContainerStyle}>
            {/* Sales Chart */}
            <div style={chartContainerStyle}>
              <h4 style={headerStyle}>Sales Over Time</h4>
              <Bar data={salesOverTimeData} options={chartOptions} />
            </div>

            {/* Earnings Chart */}
            <div style={chartContainerStyle}>
              <h4 style={headerStyle}>Revenue Over Time</h4>
              <Line data={revenueOverTimeData} options={chartOptions} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
