import { Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, PointElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, ArcElement, PointElement);

const heatmapData = {
  datasets: [
    {
      label: 'Critical Risks',
      data: [
        { x: 8, y: 9, r: 20 },
        { x: 9, y: 8, r: 25 },
      ],
      backgroundColor: 'rgba(239, 68, 68, 0.5)',
      borderColor: 'rgb(239, 68, 68)',
    },
    {
      label: 'High Risks',
      data: [
        { x: 7, y: 6, r: 15 },
        { x: 6, y: 7, r: 18 },
        { x: 8, y: 5, r: 22 },
      ],
      backgroundColor: 'rgba(245, 158, 11, 0.5)',
      borderColor: 'rgb(245, 158, 11)',
    },
    {
      label: 'Medium Risks',
      data: [
        { x: 4, y: 5, r: 12 },
        { x: 5, y: 4, r: 15 },
        { x: 3, y: 6, r: 10 },
      ],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgb(59, 130, 246)',
    },
    {
      label: 'Low Risks',
      data: [
        { x: 2, y: 2, r: 8 },
        { x: 1, y: 3, r: 10 },
        { x: 3, y: 1, r: 12 },
      ],
      backgroundColor: 'rgba(34, 197, 94, 0.5)',
      borderColor: 'rgb(34, 197, 94)',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      min: 0,
      max: 10,
      title: {
        display: true,
        text: 'Impact',
      },
    },
    y: {
      min: 0,
      max: 10,
      title: {
        display: true,
        text: 'Likelihood',
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => {
          return `${context.dataset.label}: Impact: ${context.raw.x}, Likelihood: ${context.raw.y}`;
        },
      },
    },
  },
};

const RiskHeatmap = () => (
  <div className="bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100">
    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-indigo-700 via-purple-600 to-violet-600 bg-clip-text text-transparent mb-4 sm:mb-6">
      Risk Heatmap Analysis
    </h3>

    {/* Chart Container */}
    <div className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 mb-6">
      <div className="h-[300px] sm:h-[400px] lg:h-[500px]">
        <Bubble data={heatmapData} options={options} />
      </div>
    </div>

    {/* Risk Levels Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      <div className="bg-red-50 p-3 rounded-lg border border-red-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span className="font-medium text-red-700">Critical Risk</span>
        </div>
        <span className="text-sm text-red-600">2 Issues</span>
      </div>
      
      <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
          <span className="font-medium text-amber-700">High Risk</span>
        </div>
        <span className="text-sm text-amber-600">3 Issues</span>
      </div>
      
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="font-medium text-blue-700">Medium Risk</span>
        </div>
        <span className="text-sm text-blue-600">3 Issues</span>
      </div>
      
      <div className="bg-green-50 p-3 rounded-lg border border-green-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span className="font-medium text-green-700">Low Risk</span>
        </div>
        <span className="text-sm text-green-600">3 Issues</span>
      </div>
    </div>

    {/* Risk Summary */}
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 rounded-xl shadow-md border border-gray-200">
      <h4 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-3">
        Risk Summary
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm sm:text-base">
        <div className="bg-white/80 p-3 rounded-lg shadow-sm">
          <p className="text-gray-600">Total Risks</p>
          <p className="text-xl font-semibold text-gray-900">11</p>
        </div>
        <div className="bg-white/80 p-3 rounded-lg shadow-sm">
          <p className="text-gray-600">Critical/High</p>
          <p className="text-xl font-semibold text-red-600">5</p>
        </div>
        <div className="bg-white/80 p-3 rounded-lg shadow-sm">
          <p className="text-gray-600">Medium</p>
          <p className="text-xl font-semibold text-blue-600">3</p>
        </div>
        <div className="bg-white/80 p-3 rounded-lg shadow-sm">
          <p className="text-gray-600">Low</p>
          <p className="text-xl font-semibold text-green-600">3</p>
        </div>
      </div>
    </div>
  </div>
);

export default RiskHeatmap;
