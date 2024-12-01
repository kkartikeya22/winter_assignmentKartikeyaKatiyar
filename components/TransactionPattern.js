import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { showAlert } from './Alerts';
import { useMediaQuery } from 'react-responsive';

// Dynamically import Chart.js components with no SSR
const Line = dynamic(
  () => import('react-chartjs-2').then(mod => mod.Line),
  { ssr: false }
);
import { format } from 'date-fns';

const serverDate = new Date(); // Replace this with your actual date logic
const formattedDate = format(serverDate, "Pp"); 

// Import Chart.js components only on client side
const initChartJS = async () => {
  if (typeof window !== 'undefined') {
    const { Chart: ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } = await import('chart.js');
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
      Filler
    );
  }
};

export default function TransactionPattern() {
  const [timeframe, setTimeframe] = useState('24h');
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('all');
  const [paymentType, setPaymentType] = useState('all');
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [anomalyThreshold, setAnomalyThreshold] = useState(2.5);
  const [viewMode, setViewMode] = useState('line'); // line, area, scatter
  const [anomalies, setAnomalies] = useState([]);

  // Responsive breakpoints
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });
  const isMediumScreen = useMediaQuery({ maxWidth: 768 });
  const isLargeScreen = useMediaQuery({ maxWidth: 1024 });

  // Format dates consistently between server and client using UTC
  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Memoized data generation to prevent unnecessary recalculations
  const generateMockData = useMemo(() => {
    const getDataPoints = () => {
      const points = [];
      const baseValue = 5000;
      const volatility = 0.2;
      
      for (let i = 0; i < 24; i++) {
        const randomFactor = 1 + (Math.random() - 0.5) * volatility;
        const value = baseValue * randomFactor;
        points.push(value);
      }
      
      // Inject anomalies
      const anomalyIndex = Math.floor(Math.random() * points.length);
      points[anomalyIndex] = points[anomalyIndex] * (Math.random() > 0.5 ? 2.5 : 0.3);
      
      return points;
    };

    const labels = Array.from({length: 24}, (_, i) => {
      const d = new Date();
      d.setHours(d.getHours() - (23 - i));
      return formatDate(d);
    });

    const dataPoints = getDataPoints();
    const mean = dataPoints.reduce((a, b) => a + b) / dataPoints.length;
    const stdDev = Math.sqrt(dataPoints.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / dataPoints.length);

    // Detect anomalies
    const newAnomalies = dataPoints.map((point, index) => {
      const zScore = Math.abs((point - mean) / stdDev);
      return zScore > anomalyThreshold ? index : null;
    }).filter(x => x !== null);

    setAnomalies(newAnomalies);

    return {
      labels,
      datasets: [
        {
          label: 'Transaction Volume',
          data: dataPoints,
          borderColor: 'rgb(99, 102, 241)',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          fill: viewMode === 'area',
          tension: 0.4,
          pointRadius: (context) => {
            const index = context.dataIndex;
            return newAnomalies.includes(index) ? 8 : 4;
          },
          pointBackgroundColor: (context) => {
            const index = context.dataIndex;
            return newAnomalies.includes(index) ? 'rgb(239, 68, 68)' : 'rgb(99, 102, 241)';
          },
          pointBorderColor: (context) => {
            const index = context.dataIndex;
            return newAnomalies.includes(index) ? 'rgb(239, 68, 68)' : 'rgb(99, 102, 241)';
          },
          pointBorderWidth: 2,
          pointHoverRadius: 10
        }
      ]
    };
  }, [timeframe, category, location, paymentType, viewMode, anomalyThreshold]);

  useEffect(() => {
    const setupChart = async () => {
      await initChartJS();
      setChartData(generateMockData);
      setIsLoading(false);
    };

    setupChart();
  }, [generateMockData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 750,
      easing: 'easeInOutQuart'
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          callback: function(value) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              notation: 'compact',
              compactDisplay: 'short'
            }).format(value);
          },
          font: {
            size: isSmallScreen ? 10 : 12
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          maxRotation: isSmallScreen ? 45 : 0,
          minRotation: isSmallScreen ? 45 : 0,
          autoSkip: true,
          maxTicksLimit: isSmallScreen ? 6 : (isMediumScreen ? 8 : 12),
          font: {
            size: isSmallScreen ? 10 : 12
          }
        }
      }
    },
    plugins: {
      legend: {
        display: !isSmallScreen,
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: isSmallScreen ? 10 : 12
          },
          padding: isSmallScreen ? 8 : 16
        }
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: isSmallScreen ? 8 : 12,
        borderColor: 'rgba(148, 163, 184, 0.2)',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            const formattedValue = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(value);
            
            const isAnomaly = anomalies.includes(context.dataIndex);
            return `${formattedValue}${isAnomaly ? ' ⚠️ Anomaly Detected' : ''}`;
          }
        }
      }
    }
  };

  const selectClassName = `
    bg-slate-800/90
    text-white 
    border 
    border-slate-600 
    rounded-lg 
    px-3
    py-2 
    text-sm
    md:text-base
    w-full
    focus:ring-2 
    focus:ring-indigo-500 
    focus:border-transparent
    appearance-none
    cursor-pointer
    transition-all
    hover:bg-slate-700/90
  `;

  const buttonClassName = (isActive) => `
    px-2
    md:px-3 
    py-1 
    rounded-lg 
    text-xs
    md:text-sm
    font-medium
    transition-all
    duration-200
    ${isActive 
      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
      : 'bg-slate-800/90 text-white/80 hover:bg-slate-700/90'}
  `;

  return (
    <div className="bg-slate-900/90 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-xl shadow-xl border border-slate-800">
      <div className="space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-lg md:text-xl font-semibold text-white">Transaction Patterns</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex gap-1">
              {['24h', '7d', '30d'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={buttonClassName(timeframe === period)}
                >
                  {period}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              {[
                {id: 'line', icon: '📈'},
                {id: 'area', icon: '📊'},
                {id: 'scatter', icon: '📉'}
              ].map((view) => (
                <button
                  key={view.id}
                  onClick={() => setViewMode(view.id)}
                  className={buttonClassName(viewMode === view.id)}
                  title={`Switch to ${view.id} view`}
                >
                  {view.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {[
            {value: category, setter: setCategory, options: [
              {value: 'all', label: 'All Categories'},
              {value: 'retail', label: 'Retail'},
              {value: 'food', label: 'Food & Beverage'},
              {value: 'travel', label: 'Travel'},
              {value: 'entertainment', label: 'Entertainment'},
              {value: 'services', label: 'Services'}
            ]},
            {value: location, setter: setLocation, options: [
              {value: 'all', label: 'All Locations'},
              {value: 'na', label: 'North America'},
              {value: 'eu', label: 'Europe'},
              {value: 'asia', label: 'Asia'},
              {value: 'sa', label: 'South America'},
              {value: 'af', label: 'Africa'}
            ]},
            {value: paymentType, setter: setPaymentType, options: [
              {value: 'all', label: 'All Payment Types'},
              {value: 'credit', label: 'Credit Card'},
              {value: 'debit', label: 'Debit Card'},
              {value: 'bank', label: 'Bank Transfer'},
              {value: 'crypto', label: 'Cryptocurrency'},
              {value: 'wallet', label: 'Digital Wallet'}
            ]}
          ].map((select, idx) => (
            <select
              key={idx}
              value={select.value}
              onChange={(e) => select.setter(e.target.value)}
              className={selectClassName}
            >
              {select.options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ))}
        </div>
      </div>

      <div className="h-[300px] sm:h-[400px] lg:h-[500px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            No data available
          </div>
        )}
      </div>

      {anomalies.length > 0 && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-sm text-red-400">
            ⚠️ {anomalies.length} anomalous transaction{anomalies.length !== 1 ? 's' : ''} detected
          </p>
        </div>
      )}

      <div className="mt-4 text-xs sm:text-sm text-slate-400 space-y-1">
        <p>* Red indicators highlight unusual transaction patterns</p>
        <p>* Hover over data points for detailed information</p>
      </div>
    </div>
  );
}





