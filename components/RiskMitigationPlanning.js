import React from 'react';

const RiskMitigationPlanning = ({ risk }) => {
  // Sample risk data (use this if no risk data is passed)
  const defaultRisk = {
    title: "Data Breach",
    mitigationPlan: "Implement stronger encryption protocols and conduct regular security audits.",
    responsibleParty: "IT Security Team",
    mitigationStatus: "In Progress",
    nextSteps: [
      "Encrypt sensitive data stored in the database.",
      "Set up monitoring to detect unusual access patterns.",
      "Train employees on data privacy and security best practices."
    ]
  };

  // Use the provided 'risk' data or fall back to 'defaultRisk'
  const riskData = risk || defaultRisk;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Mitigation Planning for {riskData.title}
      </h3>
      <div>
        <p><strong>Mitigation Plan:</strong> {riskData.mitigationPlan}</p>
        <p><strong>Responsible Parties:</strong> {riskData.responsibleParty}</p>
        <p><strong>Status:</strong> {riskData.mitigationStatus}</p>
        <div className="mt-4">
          <h4 className="font-medium">Next Steps</h4>
          <ul>
            {riskData.nextSteps.map((step, index) => (
              <li key={index} className="mb-2">{step}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RiskMitigationPlanning;
