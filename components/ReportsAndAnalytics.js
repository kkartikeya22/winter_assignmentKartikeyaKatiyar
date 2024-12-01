import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReportsAndAnalytics = () => {
  const [reportType, setReportType] = useState('pdf');
  const [reportGenerated, setReportGenerated] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [transactionData, setTransactionData] = useState(null);

  const generateReport = () => {
    setReportGenerated(true);
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#'; // In real app, this would be the actual report URL
      link.download = `risk-report-${Date.now()}.${reportType}`;
      link.click();
      setReportGenerated(false);
    }, 1000);
  };

  const fetchChartData = () => {
    const riskData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'High Risk Transactions',
          data: [65, 59, 80, 81, 56, 55, 70],
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: true,
        },
        {
          label: 'Medium Risk Transactions',
          data: [45, 49, 60, 71, 46, 45, 50],
          borderColor: 'rgb(245, 158, 11)',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          fill: true,
        },
        {
          label: 'Low Risk Transactions',
          data: [25, 29, 40, 41, 36, 35, 30],
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          fill: true,
        }
      ],
    };

    const transactionVolume = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Transaction Volume',
        data: [1200, 1900, 1700, 2100, 2300, 2000, 2400],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
      }]
    };

    setChartData(riskData);
    setTransactionData(transactionVolume);
  };

  React.useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-indigo-700 via-purple-600 to-violet-600 bg-clip-text text-transparent mb-4 sm:mb-6">
        Reports & Analytics Dashboard
      </h3>
      
      <div className="space-y-6 lg:space-y-8">
        <div className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-md border border-gray-100">
          <h4 className="text-lg sm:text-xl font-medium bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
            Generate Reports
          </h4>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <select 
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            >
              <option value="pdf">PDF Report</option>
              <option value="csv">CSV Export</option>
            </select>
            
            <button
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base font-medium"
              onClick={generateReport}
              disabled={reportGenerated}
            >
              {reportGenerated ? 'Generating...' : 'Download Report'}
            </button>
          </div>

          {reportGenerated && (
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
              <p className="text-indigo-600 text-sm sm:text-base">
                Preparing your report for download...
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-md border border-gray-100">
            <h4 className="text-lg sm:text-xl font-medium bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
              Risk Level Trends
            </h4>
            
            <div className="h-[300px] sm:h-[400px]">
              {chartData ? (
                <Line 
                  data={chartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                        labels: {
                          font: { size: 12, family: "'Inter', sans-serif" },
                          usePointStyle: true,
                          padding: 20
                        }
                      },
                      tooltip: {
                        backgroundColor: 'rgba(17, 24, 39, 0.95)',
                        padding: 12,
                        titleFont: { size: 14, weight: 'bold' },
                        bodyFont: { size: 13 },
                        cornerRadius: 8
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(107, 114, 128, 0.1)' }
                      },
                      x: {
                        grid: { color: 'rgba(107, 114, 128, 0.1)' }
                      }
                    }
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 animate-pulse">Loading chart...</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-md border border-gray-100">
            <h4 className="text-lg sm:text-xl font-medium bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
              Transaction Volume
            </h4>
            
            <div className="h-[300px] sm:h-[400px]">
              {transactionData ? (
                <Bar 
                  data={transactionData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                        labels: {
                          font: { size: 12, family: "'Inter', sans-serif" },
                          padding: 20
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(107, 114, 128, 0.1)' }
                      }
                    }
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 animate-pulse">Loading chart...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAndAnalytics;
