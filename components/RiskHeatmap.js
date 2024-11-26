import { Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const heatmapData = {
  datasets: [
    {
      label: 'Risk Matrix',
      data: [
        { x: 1, y: 1, r: 10 }, 
        { x: 5, y: 5, r: 30 }, 
        { x: 8, y: 3, r: 15 }, 
        { x: 2, y: 8, r: 25 },
      ],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};

const RiskHeatmap = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg h-[500px]">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Heatmap</h3>

    

    {/* Chart */}
    <div className="mb-4">
      <Bubble data={heatmapData} options={{ responsive: true }} />
    </div>

    {/* Legend / Key */}
    <div className="text-sm text-gray-600">
      <div className="flex items-center mb-2">
        <div className="w-4 h-4 bg-red-500 mr-2"></div>
        <span>High Risk</span>
      </div>
      <div className="flex items-center mb-2">
        <div className="w-4 h-4 bg-yellow-500 mr-2"></div>
        <span>Medium Risk</span>
      </div>
      <div className="flex items-center mb-2">
        <div className="w-4 h-4 bg-green-500 mr-2"></div>
        <span>Low Risk</span>
      </div>
    </div>

    {/* Risk Summary */}
    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <h4 className="font-semibold text-gray-800">Risk Summary</h4>
      <ul className="list-disc pl-5 text-sm text-gray-600">
        <li>Total Risks: 4</li>
        <li>High Risk: 1</li>
        <li>Medium Risk: 2</li>
        <li>Low Risk: 1</li>
      </ul>
    </div>
  </div>
);

export default RiskHeatmap;
