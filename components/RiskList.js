// components/RiskList.js
import React, { useState } from 'react';

const risks = [
  { 
    id: 1, 
    title: 'Data Security Breach', 
    category: 'Security', 
    severity: 'High', 
    status: 'Active',
    dateIdentified: '2024-01-15',
    owner: 'Security Team',
    lastUpdated: '2024-02-01',
    mitigation: 'Implementing enhanced encryption and access controls',
    details: 'Potential unauthorized access detected in payment processing system',
    impact: 'Could affect customer data and payment information',
    priority: 1
  },
  { 
    id: 2, 
    title: 'Payment Processing Downtime', 
    category: 'Technical', 
    severity: 'High', 
    status: 'Monitoring',
    dateIdentified: '2024-01-20',
    owner: 'Technical Operations',
    lastUpdated: '2024-02-03',
    mitigation: 'Redundant payment gateway implementation in progress',
    details: 'Intermittent payment processing failures during peak hours',
    impact: 'Direct impact on sales and customer satisfaction',
    priority: 2
  },
  // ... other risks with similar detailed structure
];

const RiskList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'priority', direction: 'asc' });
  const [filterConfig, setFilterConfig] = useState({
    severity: 'all',
    category: 'all',
    status: 'all'
  });
  const [expandedRow, setExpandedRow] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

  // Responsive breakpoint detection
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      if (window.innerWidth < 640) {
        setViewMode('card');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getSortedAndFilteredRisks = () => {
    return risks
      .filter(risk => {
        const matchesSearch = searchTerm === '' || 
          risk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          risk.details.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSeverity = filterConfig.severity === 'all' || 
          risk.severity.toLowerCase() === filterConfig.severity;
        const matchesCategory = filterConfig.category === 'all' || 
          risk.category === filterConfig.category;
        const matchesStatus = filterConfig.status === 'all' || 
          risk.status.toLowerCase() === filterConfig.status;
        
        return matchesSearch && matchesSeverity && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        const multiplier = sortConfig.direction === 'asc' ? 1 : -1;
        return a[sortConfig.key] > b[sortConfig.key] ? multiplier : -multiplier;
      });
  };

  const getSeverityClass = (severity) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch(severity.toLowerCase()) {
      case 'high': return `${baseClasses} bg-red-100 text-red-800`;
      case 'medium': return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'low': return `${baseClasses} bg-green-100 text-green-800`;
      default: return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const RiskCard = ({ risk }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{risk.title}</h3>
        <span className={getSeverityClass(risk.severity)}>{risk.severity}</span>
      </div>
      <div className="space-y-2 text-sm">
        <p className="text-gray-600"><span className="font-medium">Category:</span> {risk.category}</p>
        <p className="text-gray-600"><span className="font-medium">Status:</span> {risk.status}</p>
        <p className="text-gray-600"><span className="font-medium">Date:</span> {new Date(risk.dateIdentified).toLocaleDateString()}</p>
        <p className="text-gray-600"><span className="font-medium">Owner:</span> {risk.owner}</p>
        <div className="pt-2">
          <p className="text-gray-600 text-xs">{risk.details}</p>
        </div>
        <div className="pt-2 border-t border-gray-200">
          <p className="text-gray-600 text-xs"><span className="font-medium">Mitigation:</span> {risk.mitigation}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Risk Register</h2>
            {!isMobile && (
              <button
                onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Switch to {viewMode === 'table' ? 'Card' : 'Table'} View
              </button>
            )}
          </div>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Search risks..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                value={filterConfig.severity}
                onChange={(e) => setFilterConfig({...filterConfig, severity: e.target.value})}
              >
                <option value="all">All Severities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                value={filterConfig.category}
                onChange={(e) => setFilterConfig({...filterConfig, category: e.target.value})}
              >
                <option value="all">All Categories</option>
                {Array.from(new Set(risks.map(risk => risk.category))).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                value={filterConfig.status}
                onChange={(e) => setFilterConfig({...filterConfig, status: e.target.value})}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="monitoring">Monitoring</option>
                <option value="mitigated">Mitigated</option>
              </select>
            </div>
          </div>

          {(isMobile || viewMode === 'card') ? (
            <div className="space-y-4">
              {getSortedAndFilteredRisks().map(risk => (
                <RiskCard key={risk.id} risk={risk} />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      ['title', 'Risk Name'],
                      ['severity', 'Severity'],
                      ['category', 'Category'],
                      ['dateIdentified', 'Date'],
                      ['status', 'Status'],
                      ['owner', 'Owner']
                    ].map(([key, label]) => (
                      <th
                        key={key}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort(key)}
                      >
                        <div className="flex items-center space-x-1">
                          <span>{label}</span>
                          {sortConfig.key === key && (
                            <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getSortedAndFilteredRisks().map((risk) => (
                    <React.Fragment key={risk.id}>
                      <tr 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => setExpandedRow(expandedRow === risk.id ? null : risk.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{risk.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={getSeverityClass(risk.severity)}>{risk.severity}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {risk.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(risk.dateIdentified).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {risk.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {risk.owner}
                        </td>
                      </tr>
                      {expandedRow === risk.id && (
                        <tr>
                          <td colSpan="6" className="px-6 py-4 bg-gray-50">
                            <div className="text-sm text-gray-900 space-y-2">
                              <p><span className="font-medium">Details:</span> {risk.details}</p>
                              <p><span className="font-medium">Impact:</span> {risk.impact}</p>
                              <p><span className="font-medium">Mitigation:</span> {risk.mitigation}</p>
                              <p><span className="font-medium">Last Updated:</span> {new Date(risk.lastUpdated).toLocaleDateString()}</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskList;
