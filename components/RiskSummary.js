export default function RiskSummary() {
    return (
      <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <h2 className="text-xl font-bold mb-2 text-center">Risk Summary</h2>
        <p className="text-gray-600 mb-4 text-center">
          Overview of merchant risks and anomalies.
        </p>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Risk Score:</span>
            <span className="text-red-500 font-bold text-lg">High</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total Transactions:</span>
            <span className="font-bold text-lg">1,234</span>
          </div>
        </div>
      </div>
    );
  }
  