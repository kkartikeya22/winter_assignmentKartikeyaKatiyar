import React from 'react';

const RiskDetails = ({ risk }) => {
  // Sample risk data (you can remove this part once you're passing real data)
  const defaultRisk = {
    title: "Data Breach",
    category: "Security",
    severity: "High",
    status: "Active",
    dateIdentified: "2023-10-15",
    description: "There has been a potential data breach involving sensitive customer information.",
    mitigationPlan: "Implement stronger encryption protocols, monitor for unusual access patterns, and conduct a security audit.",
    associatedEvents: [
      {
        date: "2023-10-14",
        description: "Unusual access patterns detected from unknown IP addresses",
        type: "Security Alert"
      },
      {
        date: "2023-10-15",
        description: "Multiple failed login attempts from various locations",
        type: "Security Breach"
      }
    ]
  };

  // Use the provided 'risk' data or fall back to 'defaultRisk'
  const riskData = risk || defaultRisk;

  const getSeverityColor = (severity) => {
    switch(severity.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getEventTypeColor = (type) => {
    switch(type.toLowerCase()) {
      case 'security alert': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'security breach': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 sm:mb-6 animate-fade-in">
        <h3 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-indigo-700 via-purple-600 to-violet-600 bg-clip-text text-transparent">
          {riskData.title}
        </h3>
        <div className={`mt-2 xs:mt-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${getSeverityColor(riskData.severity)} transform transition-transform hover:scale-105`}>
          {riskData.severity} Risk Level
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-4 sm:space-y-6 animate-slide-up">
          <div className="bg-white/50 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-3 sm:mb-4">
              <h4 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                Risk Details
              </h4>
              <span className="text-xs sm:text-sm text-gray-500 mt-1 xs:mt-0">
                Identified: {new Date(riskData.dateIdentified).toLocaleDateString()}
              </span>
            </div>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600">
              <p className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2">
                <span className="font-medium text-gray-700 min-w-[80px]">Category:</span> 
                <span className="ml-2 xs:ml-0">{riskData.category}</span>
              </p>
              <p className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2">
                <span className="font-medium text-gray-700 min-w-[80px]">Status:</span>
                <span className="ml-2 xs:ml-0">{riskData.status}</span>
              </p>
              <p className="flex flex-col gap-1 xs:gap-2">
                <span className="font-medium text-gray-700">Description:</span>
                <span className="ml-2 xs:ml-0">{riskData.description}</span>
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-3 sm:p-4 md:p-6 rounded-xl shadow-md border border-purple-100 hover:shadow-lg transition-all duration-300">
            <h4 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 sm:mb-4">
              Mitigation Plan
            </h4>
            <p className="text-sm sm:text-base text-gray-600">{riskData.mitigationPlan}</p>
          </div>
        </div>

        <div className="animate-slide-up">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 sm:p-4 md:p-6 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300">
            <h4 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3 sm:mb-4">
              Associated Events
            </h4>
            <div className="space-y-3 sm:space-y-4">
              {riskData.associatedEvents.map((event, index) => (
                <div 
                  key={index}
                  className="bg-white/50 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 transform transition hover:scale-[1.02] hover:shadow-md"
                >
                  <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-2">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)} transform transition hover:scale-105`}>
                      {event.type}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 mt-1 xs:mt-0">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskDetails;
