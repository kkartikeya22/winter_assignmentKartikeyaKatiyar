import React from 'react';

const RiskDetails = ({ risk }) => {
  // Sample risk data (you can remove this part once you're passing real data)
  const defaultRisk = {
    title: "Data Breach",
    category: "Security",
    severity: "High",
    status: "Active",
    description: "There has been a potential data breach involving sensitive customer information.",
    mitigationPlan: "Implement stronger encryption protocols, monitor for unusual access patterns, and conduct a security audit.",
  };

  // Use the provided 'risk' data or fall back to 'defaultRisk'
  const riskData = risk || defaultRisk;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{riskData.title}</h3>
      <div>
        <p><strong>Category:</strong> {riskData.category}</p>
        <p><strong>Severity:</strong> {riskData.severity}</p>
        <p><strong>Status:</strong> {riskData.status}</p>
        <p><strong>Description:</strong> {riskData.description}</p>
        <div className="mt-4">
          <h4 className="font-medium">Mitigation Plan</h4>
          <p>{riskData.mitigationPlan}</p>
        </div>
      </div>
    </div>
  );
};

export default RiskDetails;
