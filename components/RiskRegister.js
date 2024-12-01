import { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const initialRisks = [
  { 
    id: 1,
    title: 'Data Security Breach',
    description: 'Potential unauthorized access to customer data',
    category: 'Security',
    severity: 'High',
    status: 'Active',
    likelihood: 'Medium',
    impact: 'Critical',
    owner: 'IT Security Team',
    lastUpdated: '2024-01-15',
    mitigationPlan: 'Implement encryption and access controls',
    history: [
      { date: '2024-01-15', action: 'Status updated to Active', user: 'John Doe' },
      { date: '2024-01-10', action: 'Risk created', user: 'Jane Smith' }
    ]
  },
  // More risk entries...
];

const RiskRegister = () => {
  const [risks, setRisks] = useState(initialRisks);
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');

  const filteredRisks = risks.filter((risk) => {
    const matchesSearch = risk.title.toLowerCase().includes(filter.toLowerCase()) ||
                         risk.description.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || risk.category === categoryFilter;
    const matchesSeverity = severityFilter === 'All' || risk.severity === severityFilter;
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const getSeverityColor = (severity) => {
    const colors = {
      'High': 'text-red-600 bg-red-50',
      'Medium': 'text-yellow-600 bg-yellow-50',
      'Low': 'text-green-600 bg-green-50'
    };
    return colors[severity] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-indigo-700 via-purple-600 to-violet-600 bg-clip-text text-transparent">
          Risk Register
        </h3>
        <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Risk
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search risks..."
          className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select 
          className="border border-gray-200 rounded-lg px-4 py-2"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Security">Security</option>
          <option value="Financial">Financial</option>
          <option value="Operational">Operational</option>
        </select>
        <select
          className="border border-gray-200 rounded-lg px-4 py-2"
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
        >
          <option value="All">All Severities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Details</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ownership</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRisks.map((risk) => (
              <tr key={risk.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{risk.title}</div>
                  <div className="text-sm text-gray-500">{risk.description}</div>
                  <div className="text-xs text-gray-400">Last updated: {risk.lastUpdated}</div>
                </td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(risk.severity)}`}>
                    {risk.severity}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Likelihood: {risk.likelihood}
                  </div>
                  <div className="text-sm text-gray-500">
                    Impact: {risk.impact}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{risk.owner}</div>
                  <div className="text-sm text-gray-500">{risk.category}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    risk.status === 'Active' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {risk.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskRegister;