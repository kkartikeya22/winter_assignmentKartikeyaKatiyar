export default function RiskAssessmentSection() {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Assessment</h3>
        
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-4">
            Assessing risks is essential to understanding the potential impact of risks on the project or business. The risk assessment includes two main parameters:
          </p>
  
          <div className="mb-4">
            <label className="block text-sm text-gray-700">Likelihood of Occurrence</label>
            <input type="range" min="1" max="10" className="w-full mb-4" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Very Unlikely</span>
              <span>Very Likely</span>
            </div>
          </div>
  
          <div>
            <label className="block text-sm text-gray-700">Impact Severity</label>
            <input type="range" min="1" max="10" className="w-full mb-4" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Minimal Impact</span>
              <span>Severe Impact</span>
            </div>
          </div>
        </div>
  
        {/* Risk Description and Explanation */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="text-md font-semibold text-gray-800 mb-2">Understanding Risk Scores</h4>
          <p className="text-sm text-gray-600">
            The Risk Score is calculated by combining the likelihood of an event occurring and the impact it would have if it does. 
            A higher score indicates a higher priority risk. Typically, the risk score is used to prioritize mitigation efforts and allocate resources effectively.
          </p>
        </div>
  
        {/* Risk Score Visualization */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-md font-semibold text-gray-800 mb-2">Risk Matrix</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center bg-green-100 p-6 rounded-lg shadow-md">
              <p className="text-green-700 text-lg font-semibold">Low Risk</p>
            </div>
            <div className="flex items-center justify-center bg-yellow-100 p-6 rounded-lg shadow-md">
              <p className="text-yellow-700 text-lg font-semibold">Moderate Risk</p>
            </div>
            <div className="flex items-center justify-center bg-red-100 p-6 rounded-lg shadow-md">
              <p className="text-red-700 text-lg font-semibold">High Risk</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  