// components/UserRolesAndPermissions.js
import React, { useState } from 'react';

const UserRolesAndPermissions = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [permissions, setPermissions] = useState({
    viewRisks: false,
    editRisks: false,
    deleteRisks: false,
    manageUsers: false,
    viewReports: false,
    exportData: false,
    configureSystem: false
  });

  const roles = [
    { id: 'admin', name: 'Admin', description: 'Full system access' },
    { id: 'riskManager', name: 'Risk Manager', description: 'Manage risks and reports' },
    { id: 'analyst', name: 'Risk Analyst', description: 'View and analyze risks' },
    { id: 'auditor', name: 'Auditor', description: 'View-only access' }
  ];

  const handlePermissionChange = (permission) => {
    setPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission]
    }));
  };

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    // Set default permissions based on role
    switch(roleId) {
      case 'admin':
        setPermissions({
          viewRisks: true,
          editRisks: true,
          deleteRisks: true,
          manageUsers: true,
          viewReports: true,
          exportData: true,
          configureSystem: true
        });
        break;
      case 'riskManager':
        setPermissions({
          viewRisks: true,
          editRisks: true,
          deleteRisks: false,
          manageUsers: false,
          viewReports: true,
          exportData: true,
          configureSystem: false
        });
        break;
      // Add other role cases
      default:
        setPermissions({
          viewRisks: false,
          editRisks: false,
          deleteRisks: false,
          manageUsers: false,
          viewReports: false,
          exportData: false,
          configureSystem: false
        });
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-indigo-700 via-purple-600 to-violet-600 bg-clip-text text-transparent mb-6">
        User Roles & Permissions
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-md border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Select Role</h4>
          <div className="space-y-4">
            {roles.map(role => (
              <div 
                key={role.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedRole === role.id 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-gray-900">{role.name}</h5>
                  {selectedRole === role.id && (
                    <span className="text-indigo-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{role.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-md border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Permissions</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(permissions).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handlePermissionChange(key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-end">
        <button className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UserRolesAndPermissions;
