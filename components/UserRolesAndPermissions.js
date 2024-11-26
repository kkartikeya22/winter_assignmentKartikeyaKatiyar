// components/UserRolesAndPermissions.js
import React from 'react';

const UserRolesAndPermissions = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">User Roles & Permissions</h3>
      <p className="mb-2">Manage user roles and access control for the risk management system.</p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Role</label>
        <select className="mt-1 block w-full p-2 border rounded-lg">
          <option>Admin</option>
          <option>Manager</option>
          <option>Team Member</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Permissions</label>
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">Can View Risks</span>
          </label>
        </div>
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">Can Edit Risks</span>
          </label>
        </div>
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">Can Delete Risks</span>
          </label>
        </div>
      </div>

      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 mt-4">
        Save Changes
      </button>
    </div>
  );
};

export default UserRolesAndPermissions;
