const RiskOverview = ({ totalRisks, criticalRisks }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Overview</h3>
        <div>
          <p>Total Risks: {totalRisks}</p>
          <p>Critical Risks: {criticalRisks}</p>
          <p>Status: Active</p>
        </div>
      </div>
    );
  };
  
  // Usage in your Home component
  <RiskOverview totalRisks={100} criticalRisks={10} />

export default RiskOverview