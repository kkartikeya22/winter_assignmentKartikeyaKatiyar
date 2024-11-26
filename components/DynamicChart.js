// components/DynamicChart.js
import React from 'react';
import { Line, Pie } from 'react-chartjs-2'; // Example with Line and Pie charts
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DynamicChart = ({ chartType, chartData, chartOptions }) => {
  // Render a different chart type based on the `chartType` prop
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center space-y-6 max-w-full overflow-hidden">
      <h3 className="text-lg font-semibold text-gray-800">Dynamic Chart</h3>
      
      {/* Switch chart type based on the prop */}
      {chartType === 'line' ? (
        <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      ) : chartType === 'pie' ? (
        <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px]">
          <Pie data={chartData} options={chartOptions} />
        </div>
      ) : (
        <div className="text-gray-600">Chart type not supported</div>
      )}
    </div>
  );
};

export default DynamicChart;
