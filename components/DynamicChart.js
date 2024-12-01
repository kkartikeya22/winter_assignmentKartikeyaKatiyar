// components/DynamicChart.js
import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register the chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DynamicChart = ({ chartType, chartData, chartOptions }) => {
  // Default styling options to match theme
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            family: "'Inter', sans-serif",
            weight: 500
          },
          color: '#1F2937' // text-gray-800
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)', // dark bg like alerts
        titleFont: {
          family: "'Inter', sans-serif",
          size: 14,
          weight: 600
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 13
        },
        padding: 12,
        cornerRadius: 8,
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1
      }
    }
  };

  // Merge default options with provided options
  const mergedOptions = {
    ...defaultOptions,
    ...chartOptions
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg flex flex-col items-center space-y-6 max-w-full overflow-hidden border border-gray-100">
      <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-700 via-purple-600 to-violet-600 bg-clip-text text-transparent">
        Dynamic Chart
      </h3>
      
      {/* Switch chart type based on the prop */}
      {chartType === 'line' ? (
        <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] p-4">
          <Line 
            data={{
              ...chartData,
              datasets: chartData.datasets.map(dataset => ({
                ...dataset,
                borderColor: dataset.borderColor || 'rgb(99, 102, 241)', // indigo-500
                backgroundColor: dataset.backgroundColor || 'rgba(99, 102, 241, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                pointBackgroundColor: 'white',
                pointBorderColor: dataset.borderColor || 'rgb(99, 102, 241)',
                pointHoverRadius: 6
              }))
            }} 
            options={mergedOptions} 
          />
        </div>
      ) : chartType === 'pie' ? (
        <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] p-4">
          <Pie 
            data={{
              ...chartData,
              datasets: chartData.datasets.map(dataset => ({
                ...dataset,
                backgroundColor: dataset.backgroundColor || [
                  'rgba(99, 102, 241, 0.8)',   // indigo
                  'rgba(168, 85, 247, 0.8)',   // purple
                  'rgba(139, 92, 246, 0.8)',   // violet
                  'rgba(59, 130, 246, 0.8)',   // blue
                  'rgba(14, 165, 233, 0.8)',   // sky
                  'rgba(79, 70, 229, 0.8)'     // indigo darker
                ],
                borderColor: 'white',
                borderWidth: 2
              }))
            }}
            options={mergedOptions}
          />
        </div>
      ) : (
        <div className="text-gray-600">Chart type not supported</div>
      )}
    </div>
  );
};

export default DynamicChart;
