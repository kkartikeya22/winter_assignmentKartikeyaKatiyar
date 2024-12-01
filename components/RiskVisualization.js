import React, { useEffect, useState } from 'react';
import { Bar, Radar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const RiskVisualization = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFactor, setSelectedFactor] = useState(null);
  const [timeRange, setTimeRange] = useState('1M');

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const riskFactors = {
    labels: ['Geographic Risk', 'Transaction Pattern', 'Industry Risk', 'Compliance Score', 'Credit Rating', 'Chargeback Rate'],
    datasets: [{
      label: 'Current Risk Factors',
      data: [0.85, 0.65, 0.45, 0.72, 0.58, 0.92],
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      borderColor: 'rgb(99, 102, 241)',
      borderWidth: 2,
      pointBackgroundColor: 'rgb(99, 102, 241)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(99, 102, 241)'
    }, {
      label: 'Industry Average',
      data: [0.45, 0.52, 0.48, 0.65, 0.72, 0.58],
      backgroundColor: 'rgba(148, 163, 184, 0.2)',
      borderColor: 'rgb(148, 163, 184)',
      borderWidth: 2,
      pointBackgroundColor: 'rgb(148, 163, 184)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(148, 163, 184)'
    }]
  };

  const historicalData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Risk Score Trend',
      data: [0.75, 0.68, 0.82, 0.79, 0.85, 0.92],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true
    }]
  };

  const detailedFactors = {
    'Geographic Risk': {
      highRiskCountries: ['Country A', 'Country B', 'Country C'],
      riskDistribution: {
        'Very High': 15,
        'High': 25,
        'Medium': 35,
        'Low': 25
      },
      recentChanges: '+5% from last month'
    },
    'Transaction Pattern': {
      unusualPatterns: ['After hours activity', 'Multiple cards', 'Split transactions'],
      velocityMetrics: {
        hourly: '25 tx/hr',
        daily: '450 tx/day',
        weekly: '2800 tx/week'
      }
    },
    'Chargeback Rate': {
      current: '2.1%',
      threshold: '1.0%',
      trend: 'Increasing',
      categories: {
        'Fraud': '45%',
        'Product not received': '30%',
        'Product not as described': '15%',
        'Other': '10%'
      }
    }
  };

  const contributingFactors = {
    labels: ['Failed Transactions', 'High-Risk Countries', 'Large Transactions', 'New Customers', 'After Hours', 'Multiple Cards'],
    datasets: [{
      label: 'Risk Contribution (%)',
      data: [85, 65, 45, 72, 58, 92],
      backgroundColor: [
        'rgba(239, 68, 68, 0.7)',
        'rgba(249, 115, 22, 0.7)',
        'rgba(234, 179, 8, 0.7)',
        'rgba(59, 130, 246, 0.7)',
        'rgba(99, 102, 241, 0.7)',
        'rgba(168, 85, 247, 0.7)'
      ],
      borderWidth: 1
    }]
  };

  const chartOptions = {
    radar: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          max: 1,
          ticks: { stepSize: 0.2 },
          grid: { color: 'rgba(0, 0, 0, 0.1)' },
          angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
          pointLabels: {
            font: { size: windowWidth < 768 ? 10 : 12 }
          }
        }
      },
      plugins: {
        legend: {
          position: windowWidth < 768 ? 'bottom' : 'top',
          labels: { font: { size: windowWidth < 768 ? 10 : 12 } }
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.dataset.label}: ${(context.raw * 100).toFixed(1)}%`
          }
        }
      }
    },
    bar: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: windowWidth < 768 ? 'y' : 'x',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => `Contribution: ${context.raw}%`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: { display: false },
          ticks: { font: { size: windowWidth < 768 ? 10 : 12 } }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: windowWidth < 768 ? 10 : 12 } }
        }
      }
    },
    line: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 1,
          ticks: {
            callback: (value) => `${(value * 100).toFixed(0)}%`
          }
        }
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-indigo-700 via-purple-600 to-violet-600 bg-clip-text text-transparent">
          Risk Factor Analysis
        </h3>
        
        <div className="flex gap-2 mt-4 sm:mt-0">
          {['1W', '1M', '3M', '6M', '1Y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-md text-sm ${
                timeRange === range
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-100">
          <div className="h-[400px]">
            <Radar data={riskFactors} options={chartOptions.radar} />
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Risk Trend</h4>
          <div className="h-[400px]">
            <Line data={historicalData} options={chartOptions.line} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {Object.entries(detailedFactors).map(([factor, details]) => (
          <div
            key={factor}
            className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedFactor(factor)}
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-2">{factor}</h4>
            <div className="space-y-2">
              {Object.entries(details).map(([key, value]) => (
                <div key={key} className="text-sm">
                  <span className="text-gray-600">{key}: </span>
                  <span className="text-gray-800">
                    {typeof value === 'object' ? Object.keys(value).length + ' categories' : value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Contributing Factors</h4>
        <div className="h-[300px] sm:h-[400px]">
          <Bar data={contributingFactors} options={chartOptions.bar} />
        </div>
      </div>

      {selectedFactor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{selectedFactor} Details</h3>
              <button
                onClick={() => setSelectedFactor(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {Object.entries(detailedFactors[selectedFactor]).map(([key, value]) => (
                <div key={key}>
                  <h4 className="font-medium text-gray-700">{key}</h4>
                  {typeof value === 'object' ? (
                    <ul className="list-disc list-inside">
                      {Object.entries(value).map(([k, v]) => (
                        <li key={k} className="text-gray-600">
                          {k}: {v}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">{value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskVisualization;
