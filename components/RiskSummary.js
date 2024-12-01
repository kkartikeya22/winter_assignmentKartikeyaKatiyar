export default function RiskSummary({ 
  riskScore = 75, 
  riskLevel = 'High',
  totalTransactions = 1234,
  flaggedTransactions = 89,
  riskFactors = [
    { category: 'Transaction Pattern', score: 85, description: 'Unusual transaction frequency and amounts detected' },
    { category: 'Location', score: 65, description: 'Transactions from high-risk geographical areas' },
    { category: 'Device', score: 45, description: 'Multiple devices used for authentication' },
    { category: 'History', score: 70, description: 'Recent increase in suspicious activities' }
  ]
}) {
  const getRiskLevelColor = (level) => {
    switch(level.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskBarColor = (score) => {
    if (score >= 75) return 'bg-red-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
      {/* Header Section */}
      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 mb-6">
        <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-indigo-700 via-purple-600 to-violet-600 bg-clip-text text-transparent">
          Risk Summary
        </h2>
        <div className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border ${getRiskLevelColor(riskLevel)}`}>
          {riskLevel} Risk Level
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Risk Score Gauge */}
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-100">
            <p className="text-xs sm:text-sm text-gray-600 mb-2">Overall Risk Score</p>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl sm:text-3xl font-bold text-gray-800">{riskScore}</span>
              <span className="text-xs sm:text-sm text-gray-500">/100</span>
            </div>
            <div className="h-2.5 sm:h-3 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getRiskBarColor(riskScore)} transition-all duration-500`}
                style={{ width: `${riskScore}%` }}
              />
            </div>
          </div>

          {/* Transaction Metrics */}
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-100">
            <p className="text-xs sm:text-sm text-gray-600 mb-4">Transaction Overview</p>
            <div className="space-y-4">
              <div className="flex flex-col xs:flex-row justify-between gap-2">
                <span className="text-xs sm:text-sm text-gray-600">Total Transactions</span>
                <span className="font-semibold text-gray-800">{totalTransactions.toLocaleString()}</span>
              </div>
              <div className="flex flex-col xs:flex-row justify-between gap-2">
                <span className="text-xs sm:text-sm text-gray-600">Flagged Transactions</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-red-600">{flaggedTransactions}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full text-red-600 bg-red-50 border border-red-100">
                    {((flaggedTransactions/totalTransactions) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Risk Categories */}
        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-100">
          <p className="text-xs sm:text-sm text-gray-600 mb-4">Risk Categories</p>
          <div className="space-y-4">
            {riskFactors.map((factor, index) => (
              <div key={index} className="space-y-2 group">
                <div className="flex flex-col xs:flex-row justify-between gap-1">
                  <span className="text-xs sm:text-sm text-gray-600">{factor.category}</span>
                  <span className="font-medium text-gray-800">{factor.score}</span>
                </div>
                <div className="relative">
                  <div className="h-2 sm:h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getRiskBarColor(factor.score)} transition-all duration-500`}
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-full mb-2 left-0 w-full">
                    <div className="bg-gray-800 text-white text-xs p-2 rounded shadow-lg">
                      {factor.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}