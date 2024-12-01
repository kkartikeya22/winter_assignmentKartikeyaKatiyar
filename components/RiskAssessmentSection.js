export default function RiskAssessmentSection() {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-indigo-700 via-purple-600 to-violet-600 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6">
        Merchant Risk Profile
      </h3>

      {/* Risk Score Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        <div className="bg-gradient-to-br from-red-50 to-rose-50 p-3 sm:p-4 md:p-5 rounded-xl shadow-md border border-red-100 transform transition-all duration-300 hover:scale-[1.02]">
          <h4 className="text-xs sm:text-sm md:text-base font-medium text-gray-600 mb-1 sm:mb-2">Overall Risk Score</h4>
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
            8.5/10
          </div>
          <p className="text-[10px] sm:text-xs md:text-sm text-red-600 mt-1">Critical Risk Level - Immediate Action Required</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-3 sm:p-4 md:p-5 rounded-xl shadow-md border border-amber-100 transform transition-all duration-300 hover:scale-[1.02]">
          <h4 className="text-xs sm:text-sm md:text-base font-medium text-gray-600 mb-1 sm:mb-2">Flagged Transactions</h4>
          <div className="flex items-baseline">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">12</span>
            <span className="text-xs sm:text-sm text-amber-600 ml-2">of 156 Total</span>
          </div>
          <p className="text-[10px] sm:text-xs md:text-sm text-amber-600 mt-1">7.7% Flag Rate (Last 30 Days)</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-3 sm:p-4 md:p-5 rounded-xl shadow-md border border-emerald-100 transform transition-all duration-300 hover:scale-[1.02] sm:col-span-2 lg:col-span-1">
          <h4 className="text-xs sm:text-sm md:text-base font-medium text-gray-600 mb-1 sm:mb-2">Active Risk Categories</h4>
          <div className="flex items-baseline">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">4/6</span>
            <span className="text-xs sm:text-sm text-emerald-600 ml-2">Categories Flagged</span>
          </div>
          <p className="text-[10px] sm:text-xs md:text-sm text-emerald-600 mt-1">66.7% Category Alert Rate</p>
        </div>
      </div>

      {/* Detailed Risk Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white/50 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-xl shadow-md border border-gray-100">
          <h4 className="text-base sm:text-lg font-medium bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-3 sm:mb-4">
            Risk Categories Breakdown
          </h4>
          <div className="space-y-3 sm:space-y-4">
            {[
              { category: "Transaction Patterns", score: 85, color: "rose", details: "Unusual volume spikes detected" },
              { category: "Location Analysis", score: 65, color: "amber", details: "Multiple new locations" },
              { category: "Identity Verification", score: 40, color: "emerald", details: "Mostly verified transactions" },
              { category: "Financial History", score: 75, color: "orange", details: "Recent suspicious patterns" },
              { category: "Device Intelligence", score: 55, color: "blue", details: "Multiple device switches" },
              { category: "Behavioral Analysis", score: 80, color: "purple", details: "Abnormal usage patterns" }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex justify-between items-center mb-1 sm:mb-2">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">{item.category}</span>
                  <span className={`text-${item.color}-600 text-xs sm:text-sm font-medium`}>{item.score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mb-1">
                  <div 
                    className={`bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 h-1.5 sm:h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500">{item.details}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-xl shadow-md border border-gray-100">
          <h4 className="text-base sm:text-lg font-medium bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-3 sm:mb-4 flex justify-between items-center">
            Recent Risk Alerts
            <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">Live Updates</span>
          </h4>
          <div className="space-y-2 sm:space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto">
            {[
              { alert: "Unusual transaction volume spike", severity: "High", time: "2 hours ago", details: "500% increase in transaction volume" },
              { alert: "Multiple failed authentication attempts", severity: "Medium", time: "5 hours ago", details: "15 failed attempts from IP 192.168.1.1" },
              { alert: "New location detected", severity: "Low", time: "1 day ago", details: "Transaction from previously unseen location" },
              { alert: "Large transaction flagged", severity: "High", time: "2 days ago", details: "Transaction amount exceeds normal pattern" },
              { alert: "Multiple device switches", severity: "Medium", time: "3 days ago", details: "Account accessed from 5 different devices" }
            ].map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-start sm:items-center space-x-3 mb-2 sm:mb-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 sm:mt-0 ${
                    item.severity === "High" ? "bg-red-500" :
                    item.severity === "Medium" ? "bg-yellow-500" : "bg-green-500"
                  }`}></div>
                  <div>
                    <span className="text-xs sm:text-sm text-gray-700 block sm:inline">{item.alert}</span>
                    <span className="text-[10px] sm:text-xs text-gray-500 block sm:inline sm:ml-2">{item.details}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-4 ml-5">
                  <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full ${
                    item.severity === "High" ? "bg-red-100 text-red-700" :
                    item.severity === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                  }`}>
                    {item.severity}
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-500">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}