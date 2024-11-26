import React, { useState } from 'react';
import { Line } from 'react-chartjs-2'; // Importing the Line chart from Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registering the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ReportsAndAnalytics = () => {
  const [reportGenerated, setReportGenerated] = useState(false); // To track if the report is generated
  const [chartData, setChartData] = useState(null); // To store the chart data

  // Simulate report generation
  const generateReport = () => {
    setReportGenerated(true);
    setTimeout(() => {
      alert('Report generated successfully!');
    }, 1000);
  };

  // Simulate fetching data for the chart (Risk trends over time)
  const fetchChartData = () => {
    // This is mock data; replace with real data fetching logic
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Risk Levels',
          data: [65, 59, 80, 81, 56, 55, 70], // Example data
          borderColor: '#4BC0C0',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    };
    setChartData(data); // Set chart data
  };

  // Fetch chart data when the component is mounted
  React.useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Reports & Analytics</h3>
      <div>
        <p className="mb-2">
          Here you can generate custom reports based on risk data, categories, and mitigation status.
        </p>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          onClick={generateReport}
        >
          Generate Report
        </button>
        {reportGenerated && (
          <p className="mt-4 text-green-600">Report has been generated successfully!</p>
        )}
      </div>

      {/* Example of a chart or trends */}
      <div className="mt-6">
        <h4 className="text-lg font-medium mb-2">Risk Trends</h4>
        <div className="bg-gray-200 h-48 rounded-lg">
          {/* If chart data exists, render the chart */}
          {chartData ? (
            <Line data={chartData} options={{ responsive: true }} />
          ) : (
            <p className="text-center text-gray-500 mt-20">Loading chart...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsAndAnalytics;
