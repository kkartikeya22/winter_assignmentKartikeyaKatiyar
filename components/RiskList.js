// components/RiskList.js
import React, { useState } from 'react';

const risks = [
  { id: 1, title: 'Operational Risk', category: 'Operational', severity: 'High', status: 'Active' },
  { id: 2, title: 'Financial Risk', category: 'Financial', severity: 'Medium', status: 'Mitigated' },
  // More risk data...
];

const RiskList = () => {
  const [filter, setFilter] = useState('');
  const filteredRisks = risks.filter((risk) => 
    risk.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Register</h3>
      <input
        type="text"
        placeholder="Search Risks"
        className="border p-2 mb-4 w-full"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredRisks.map((risk) => (
          <li key={risk.id} className="p-4 border-b">
            <h4 className="text-lg font-semibold">{risk.title}</h4>
            <p>Category: {risk.category}</p>
            <p>Severity: {risk.severity}</p>
            <p>Status: {risk.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RiskList;
