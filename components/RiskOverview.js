const RiskOverview = ({ 
  riskScore = 75,
  riskMetrics = {
    totalTransactions: 15847,
    totalVolume: 2456789,
    avgTicketSize: 155,
    declineRate: 3.2,
    failureRate: 1.8,
    chargebackRate: 0.9,
    fraudRate: 0.4,
    avgProcessingTime: 2.3,
    successfulAuth: 96.8,
    riskyCategoryBreakdown: {
      gambling: 35,
      crypto: 28,
      highValueGoods: 22,
      digitalGoods: 15
    }
  },
  topRisks = [
    { 
      category: 'High-Risk Geography',
      count: 245,
      percentage: 28,
      trend: 'up',
      details: 'Increased activity from restricted countries',
      change: '+12%',
      impactScore: 85,
      timeFrame: 'Last 24h',
      affectedVolume: 156789
    },
    { 
      category: 'Large Transactions',
      count: 156, 
      percentage: 18,
      trend: 'down',
      details: 'Transactions over $1,000 threshold',
      change: '-5%',
      impactScore: 72,
      timeFrame: 'Last 24h',
      affectedVolume: 89234
    },
    { 
      category: 'New Customers',
      count: 132,
      percentage: 15,
      trend: 'up',
      details: 'First-time purchasers within 24h',
      change: '+8%',
      impactScore: 65,
      timeFrame: 'Last 24h',
      affectedVolume: 45678
    },
    { 
      category: 'Velocity Pattern',
      count: 98,
      percentage: 11,
      trend: 'stable',
      details: 'Multiple transactions in short period',
      change: '+1%',
      impactScore: 58,
      timeFrame: 'Last 24h',
      affectedVolume: 34567
    }
  ],
  recentAlerts = [
    {
      id: 1,
      type: 'Critical',
      message: 'Unusual spike in transaction volume detected',
      timestamp: '2024-01-20T14:23:00Z',
      affectedTransactions: 156,
      potentialLoss: 23456,
      recommendedAction: 'Review and adjust velocity rules'
    },
    {
      id: 2,
      type: 'Warning',
      message: 'Multiple failed authentication attempts',
      timestamp: '2024-01-20T13:15:00Z',
      affectedTransactions: 89,
      potentialLoss: 12345,
      recommendedAction: 'Enable additional authentication measures'
    }
  ],
  historicalData = {
    daily: [/* ... */],
    weekly: [/* ... */],
    monthly: [/* ... */]
  }
}) => {
  
  const getRiskLevel = (score) => {
    if (score >= 80) return { label: 'Critical', color: 'text-red-600', bgColor: 'bg-red-50', ringColor: 'ring-red-200' };
    if (score >= 60) return { label: 'High', color: 'text-orange-600', bgColor: 'bg-orange-50', ringColor: 'ring-orange-200' };
    if (score >= 40) return { label: 'Medium', color: 'text-yellow-600', bgColor: 'bg-yellow-50', ringColor: 'ring-yellow-200' };
    return { label: 'Low', color: 'text-green-600', bgColor: 'bg-green-50', ringColor: 'ring-green-200' };
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '→';
    }
  };

  const getTrendColor = (trend) => {
    switch(trend) {
      case 'up': return 'text-red-500';
      case 'down': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const riskLevel = getRiskLevel(riskScore);

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-2 sm:p-4 md:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 sm:mb-6 space-y-4 lg:space-y-0">
        <div className="flex flex-col space-y-2">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-indigo-700 via-purple-600 to-violet-600 bg-clip-text text-transparent">
            Risk Overview
          </h3>
          <p className="text-sm text-gray-500">
            Comprehensive risk analysis and monitoring dashboard
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="hidden sm:inline">Last updated:</span>
            <span className="font-medium">{formatDate(new Date().toISOString())}</span>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              Export Data
            </button>
            <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Column - Risk Score and Metrics */}
        <div className="xl:col-span-4 space-y-4 sm:space-y-6">
          {/* Risk Score Circle */}
          <div className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center">
            <div className="relative w-36 sm:w-48 h-36 sm:h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle 
                  cx="50%" 
                  cy="50%" 
                  r="45%" 
                  fill="none" 
                  stroke="#eee" 
                  strokeWidth="10%"
                />
                <circle 
                  cx="50%" 
                  cy="50%" 
                  r="45%" 
                  fill="none" 
                  stroke="url(#gradient)" 
                  strokeWidth="10%"
                  strokeDasharray={`${riskScore * 2.83} 283`}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" gradientTransform="rotate(90)">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {riskScore}
                </span>
                <span className={`text-base sm:text-lg font-semibold ${riskLevel.color}`}>
                  {riskLevel.label} Risk
                </span>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500 text-center">
              Overall Risk Score based on multiple factors
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-md border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center justify-between">
              <span>Key Risk Metrics</span>
              <select className="text-sm border rounded-lg px-2 py-1">
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Total Volume</div>
                <div className="font-semibold">{formatCurrency(riskMetrics.totalVolume)}</div>
                <div className="text-xs text-gray-500">{riskMetrics.totalTransactions.toLocaleString()} transactions</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Avg Ticket</div>
                <div className="font-semibold">{formatCurrency(riskMetrics.avgTicketSize)}</div>
                <div className="text-xs text-gray-500">Per transaction</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Decline Rate</div>
                <div className="font-semibold text-orange-600">{riskMetrics.declineRate}%</div>
                <div className="text-xs text-gray-500">Of total attempts</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Fraud Rate</div>
                <div className="font-semibold text-red-600">{riskMetrics.fraudRate}%</div>
                <div className="text-xs text-gray-500">Of approved transactions</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Chargeback Rate</div>
                <div className="font-semibold text-red-600">{riskMetrics.chargebackRate}%</div>
                <div className="text-xs text-gray-500">Last 30 days</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Auth Success</div>
                <div className="font-semibold text-green-600">{riskMetrics.successfulAuth}%</div>
                <div className="text-xs text-gray-500">First attempt</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Risk Contributors and Alerts */}
        <div className="xl:col-span-8 space-y-4 sm:space-y-6">
          {/* Top Risk Contributors */}
          <div className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-gray-700">
                Top Risk Contributors
              </h4>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50">
                  Filter
                </button>
                <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50">
                  Details
                </button>
              </div>
            </div>
            <div className="space-y-6">
              {topRisks.map((risk, index) => (
                <div key={index} className="group hover:bg-gray-50 p-3 rounded-lg transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">
                          {risk.category}
                        </span>
                        <span className={`text-sm ${getTrendColor(risk.trend)}`}>
                          {getTrendIcon(risk.trend)} {risk.change}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{risk.details}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-700">
                          {risk.count.toLocaleString()} events
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatCurrency(risk.affectedVolume)} affected
                        </div>
                      </div>
                      <div className="hidden sm:block w-24 text-right">
                        <div className="text-sm font-semibold text-gray-700">
                          {risk.percentage}%
                        </div>
                        <div className="text-xs text-gray-500">
                          of total risk
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${risk.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-700">
                Recent Alerts
              </h4>
              <button className="text-sm text-indigo-600 hover:text-indigo-700">
                View All Alerts →
              </button>
            </div>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      alert.type === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {alert.type}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(alert.timestamp)} • {alert.affectedTransactions} transactions affected • 
                        Potential loss: {formatCurrency(alert.potentialLoss)}
                      </p>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <div className="text-xs font-medium text-gray-600">Recommended Action:</div>
                    <div className="text-sm text-gray-700">{alert.recommendedAction}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskOverview;