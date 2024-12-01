import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { format } from 'date-fns';

const serverDate = new Date(); // Replace this with your actual date logic
const formattedDate = format(serverDate, "Pp"); 
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const TransactionStatistics = () => {
  const [timeframe, setTimeframe] = useState('daily');
  const [transactionType, setTransactionType] = useState('all');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const statistics = {
    daily: {
      totalTransactions: 245,
      totalVolume: 52430,
      suspiciousCount: 12,
      byHour: Array.from({length: 24}, (_, i) => ({
        hour: i,
        transactions: Math.floor(Math.random() * 20),
        volume: Math.floor(Math.random() * 5000)
      })),
      byType: {
        credit: 125,
        debit: 85,
        crypto: 35
      }
    },
    weekly: {
      totalTransactions: 1680,
      totalVolume: 367400,
      suspiciousCount: 84,
      byDay: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
        day,
        transactions: Math.floor(Math.random() * 300),
        volume: Math.floor(Math.random() * 60000)
      })),
      byType: {
        credit: 840,
        debit: 590,
        crypto: 250
      }
    },
    monthly: {
      totalTransactions: 7250,
      totalVolume: 1580000,
      suspiciousCount: 365,
      byWeek: Array.from({length: 4}, (_, i) => ({
        week: `Week ${i + 1}`,
        transactions: Math.floor(Math.random() * 2000),
        volume: Math.floor(Math.random() * 400000)
      })),
      byType: {
        credit: 3625,
        debit: 2540,
        crypto: 1085
      }
    }
  };

  const getChartData = () => {
    let labels, data;
    switch(timeframe) {
      case 'daily':
        labels = statistics.daily.byHour.map(h => `${h.hour}:00`);
        data = statistics.daily.byHour.map(h => h.transactions);
        break;
      case 'weekly':
        labels = statistics.weekly.byDay.map(d => d.day);
        data = statistics.weekly.byDay.map(d => d.transactions);
        break;
      case 'monthly':
        labels = statistics.monthly.byWeek.map(w => w.week);
        data = statistics.monthly.byWeek.map(w => w.transactions);
        break;
      default:
        labels = [];
        data = [];
    }

    return {
      labels,
      datasets: [{
        label: 'Transactions',
        data,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4
      }]
    };
  };

  const getPieData = () => {
    const typeData = statistics[timeframe].byType;
    return {
      labels: ['Credit', 'Debit', 'Crypto'],
      datasets: [{
        data: [typeData.credit, typeData.debit, typeData.crypto],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(249, 115, 22, 0.8)'
        ]
      }]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: windowWidth < 768 ? 'bottom' : 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: windowWidth < 768 ? 10 : 12
          }
        }
      },
      tooltip: {
        padding: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: windowWidth < 768 ? 10 : 12
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            size: windowWidth < 768 ? 10 : 12
          }
        }
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-indigo-700 via-purple-600 to-violet-600 bg-clip-text text-transparent">
          Transaction Statistics
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <select
            className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
            <option value="crypto">Crypto</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-100">
          <p className="text-sm text-gray-600 mb-2">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-800">
            {statistics[timeframe].totalTransactions.toLocaleString()}
          </p>
        </div>

        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-100">
          <p className="text-sm text-gray-600 mb-2">Transaction Volume</p>
          <p className="text-2xl font-bold text-gray-800">
            ${statistics[timeframe].totalVolume.toLocaleString()}
          </p>
        </div>

        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-100">
          <p className="text-sm text-gray-600 mb-2">Suspicious Transactions</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-red-600">
              {statistics[timeframe].suspiciousCount.toLocaleString()}
            </p>
            <span className="text-xs px-2 py-0.5 rounded-full text-red-600 bg-red-50">
              {((statistics[timeframe].suspiciousCount / statistics[timeframe].totalTransactions) * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-100">
          <p className="text-sm text-gray-600 mb-2">Average Per {timeframe === 'daily' ? 'Hour' : timeframe === 'weekly' ? 'Day' : 'Week'}</p>
          <p className="text-2xl font-bold text-gray-800">
            {Math.round(statistics[timeframe].totalTransactions / (timeframe === 'daily' ? 24 : timeframe === 'weekly' ? 7 : 4)).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Transaction Trend</h4>
          <div className="h-[300px] sm:h-[400px]">
            <Line data={getChartData()} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Transaction Types</h4>
          <div className="h-[300px] sm:h-[400px]">
            <Pie data={getPieData()} options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                legend: {
                  ...chartOptions.plugins.legend,
                  position: 'bottom'
                }
              }
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionStatistics;



