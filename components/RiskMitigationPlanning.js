import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const RiskMitigationPlanning = ({ risk, onUpdate }) => {
  const [mitigationPlan, setMitigationPlan] = useState('');
  const [steps, setSteps] = useState([]);
  const [newStep, setNewStep] = useState({
    task: '',
    assignee: '',
    deadline: '',
    priority: 'medium',
    description: '',
    dependencies: [],
    resources: '',
    estimatedCost: '',
    contingencyPlan: ''
  });
  const [isAddingStep, setIsAddingStep] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');
  const [showDetails, setShowDetails] = useState({});

  // Sample team members for assignee selection
  const teamMembers = [
    { id: 1, name: 'Sarah Chen', role: 'Security Engineer' },
    { id: 2, name: 'Mike Johnson', role: 'System Administrator' },
    { id: 3, name: 'Alex Wong', role: 'Project Manager' },
    { id: 4, name: 'Lisa Park', role: 'Risk Analyst' }
  ];

  const defaultRisk = {
    id: 1,
    title: "Data Breach",
    description: "Potential unauthorized access to customer data",
    severity: "high",
    probability: "medium",
    mitigationPlan: "Implement comprehensive security measures and monitoring",
    budget: 50000,
    steps: [
      {
        id: 1,
        task: "Implement end-to-end encryption",
        description: "Deploy AES-256 encryption for all sensitive data at rest and in transit",
        assignee: "Sarah Chen",
        deadline: "2024-02-15",
        priority: "high",
        status: "in-progress",
        progress: 60,
        dependencies: [],
        resources: "Encryption software licenses, development team",
        estimatedCost: 15000,
        contingencyPlan: "Revert to previous encryption system if issues arise",
        lastUpdated: "2024-01-20",
        comments: [
          { user: "Mike Johnson", text: "Need to coordinate with cloud team", date: "2024-01-19" }
        ]
      },
      {
        id: 2,
        task: "Set up intrusion detection system",
        description: "Install and configure enterprise IDS/IPS solution",
        assignee: "Mike Johnson",
        deadline: "2024-02-28",
        priority: "high",
        status: "not-started",
        progress: 0,
        dependencies: [1],
        resources: "IDS software, network team",
        estimatedCost: 20000,
        contingencyPlan: "Deploy temporary monitoring solution",
        lastUpdated: "2024-01-20"
      }
    ]
  };

  const riskData = risk || defaultRisk;

  useEffect(() => {
    if (riskData) {
      setMitigationPlan(riskData.mitigationPlan);
      setSteps(riskData.steps);
      calculateProgress(riskData.steps);
    }
  }, [riskData]);

  const calculateProgress = (currentSteps) => {
    if (!currentSteps.length) return 0;
    const totalProgress = currentSteps.reduce((sum, step) => sum + step.progress, 0);
    setOverallProgress(Math.round(totalProgress / currentSteps.length));
  };

  const handleStepSubmit = (e) => {
    e.preventDefault();
    const updatedSteps = [...steps, {
      ...newStep,
      id: steps.length + 1,
      status: 'not-started',
      progress: 0,
      lastUpdated: format(new Date(), 'yyyy-MM-dd'),
      comments: []
    }];
    
    setSteps(updatedSteps);
    calculateProgress(updatedSteps);
    setIsAddingStep(false);
    setNewStep({
      task: '',
      assignee: '',
      deadline: '',
      priority: 'medium',
      description: '',
      dependencies: [],
      resources: '',
      estimatedCost: '',
      contingencyPlan: ''
    });
    
    if (onUpdate) {
      onUpdate({
        ...riskData,
        steps: updatedSteps,
        mitigationPlan
      });
    }
  };

  const updateStepProgress = (stepId, newProgress) => {
    const updatedSteps = steps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          progress: parseInt(newProgress),
          status: newProgress >= 100 ? 'completed' : 
                 newProgress > 0 ? 'in-progress' : 'not-started',
          lastUpdated: format(new Date(), 'yyyy-MM-dd')
        };
      }
      return step;
    });
    
    setSteps(updatedSteps);
    calculateProgress(updatedSteps);
    
    if (onUpdate) {
      onUpdate({
        ...riskData,
        steps: updatedSteps,
        mitigationPlan
      });
    }
  };

  const addComment = (stepId, comment) => {
    const updatedSteps = steps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          comments: [...(step.comments || []), {
            user: 'Current User', // Replace with actual user
            text: comment,
            date: format(new Date(), 'yyyy-MM-dd')
          }]
        };
      }
      return step;
    });
    setSteps(updatedSteps);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-600 bg-red-50 border-red-200',
      medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      low: 'text-green-600 bg-green-50 border-green-200'
    };
    return colors[priority] || colors.medium;
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      'completed': 'bg-green-100 text-green-800 border-green-200',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
      'not-started': 'bg-gray-100 text-gray-800 border-gray-200',
      'blocked': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || colors['not-started'];
  };

  const filteredAndSortedSteps = steps
    .filter(step => {
      if (activeFilter === 'all') return true;
      return step.status === activeFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return new Date(a.deadline) - new Date(b.deadline);
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'progress':
          return b.progress - a.progress;
        default:
          return 0;
      }
    });

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-indigo-700 via-purple-600 to-violet-600 bg-clip-text text-transparent">
              Risk Mitigation Plan
            </h3>
            <p className="text-gray-600 mt-2">for {riskData.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(riskData.severity)}`}>
              {riskData.severity.toUpperCase()} Severity
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(riskData.probability)}`}>
              {riskData.probability.toUpperCase()} Probability
            </span>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-sm font-medium text-gray-500">Total Steps</h4>
          <p className="text-2xl font-semibold text-gray-900">{steps.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-sm font-medium text-gray-500">Completed</h4>
          <p className="text-2xl font-semibold text-green-600">
            {steps.filter(s => s.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-sm font-medium text-gray-500">Budget</h4>
          <p className="text-2xl font-semibold text-gray-900">${riskData.budget.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-sm font-medium text-gray-500">Overall Progress</h4>
          <p className="text-2xl font-semibold text-indigo-600">{overallProgress}%</p>
        </div>
      </div>

      {/* Mitigation Strategy Section */}
      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Mitigation Strategy</h4>
          <textarea
            value={mitigationPlan}
            onChange={(e) => setMitigationPlan(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
            placeholder="Describe the overall mitigation strategy..."
          />
        </div>
      </div>

      {/* Action Steps Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h4 className="text-lg font-medium text-gray-900">Action Steps</h4>
          <div className="flex flex-wrap gap-2">
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="blocked">Blocked</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="deadline">Sort by Deadline</option>
              <option value="priority">Sort by Priority</option>
              <option value="progress">Sort by Progress</option>
            </select>
            <button
              onClick={() => setIsAddingStep(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
            >
              Add Step
            </button>
          </div>
        </div>

        {/* Add New Step Form */}
        {isAddingStep && (
          <form onSubmit={handleStepSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
                <input
                  type="text"
                  required
                  value={newStep.task}
                  onChange={(e) => setNewStep({...newStep, task: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter task name"
                />
              </div>
              
              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newStep.description}
                  onChange={(e) => setNewStep({...newStep, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="Detailed description of the task"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                <select
                  required
                  value={newStep.assignee}
                  onChange={(e) => setNewStep({...newStep, assignee: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Assignee</option>
                  {teamMembers.map(member => (
                    <option key={member.id} value={member.name}>
                      {member.name} - {member.role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <input
                  type="date"
                  required
                  value={newStep.deadline}
                  onChange={(e) => setNewStep({...newStep, deadline: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={newStep.priority}
                  onChange={(e) => setNewStep({...newStep, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Cost ($)</label>
                <input
                  type="number"
                  value={newStep.estimatedCost}
                  onChange={(e) => setNewStep({...newStep, estimatedCost: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="0"
                />
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Required Resources</label>
                <input
                  type="text"
                  value={newStep.resources}
                  onChange={(e) => setNewStep({...newStep, resources: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="List required resources"
                />
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Contingency Plan</label>
                <textarea
                  value={newStep.contingencyPlan}
                  onChange={(e) => setNewStep({...newStep, contingencyPlan: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  rows="2"
                  placeholder="Backup plan if issues arise"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddingStep(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Step
              </button>
            </div>
          </form>
        )}

        {/* Steps List */}
        <div className="space-y-4">
          {filteredAndSortedSteps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-lg">{step.task}</h5>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadgeColor(step.status)}`}>
                        {step.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-sm">
                      <span className="text-gray-600">
                        👤 {step.assignee}
                      </span>
                      <span className="text-gray-600">
                        📅 {new Date(step.deadline).toLocaleDateString()}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full ${getPriorityColor(step.priority)}`}>
                        {step.priority.toUpperCase()} Priority
                      </span>
                      {step.estimatedCost && (
                        <span className="text-gray-600">
                          💰 ${parseInt(step.estimatedCost).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full sm:w-48">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm font-medium text-gray-700">
                        Progress
                      </label>
                      <span className="text-sm text-gray-600">{step.progress}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={step.progress}
                      onChange={(e) => updateStepProgress(step.id, e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setShowDetails({...showDetails, [step.id]: !showDetails[step.id]})}
                  className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  {showDetails[step.id] ? 'Hide Details' : 'Show Details'}
                </button>

                {showDetails[step.id] && (
                  <div className="mt-4 space-y-4 text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h6 className="font-medium text-gray-900 mb-2">Description</h6>
                      <p className="text-gray-600">{step.description}</p>
                    </div>

                    {step.resources && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h6 className="font-medium text-gray-900 mb-2">Required Resources</h6>
                        <p className="text-gray-600">{step.resources}</p>
                      </div>
                    )}

                    {step.contingencyPlan && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h6 className="font-medium text-gray-900 mb-2">Contingency Plan</h6>
                        <p className="text-gray-600">{step.contingencyPlan}</p>
                      </div>
                    )}

                    {step.dependencies?.length > 0 && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h6 className="font-medium text-gray-900 mb-2">Dependencies</h6>
                        <div className="flex flex-wrap gap-2">
                          {step.dependencies.map(depId => {
                            const depStep = steps.find(s => s.id === depId);
                            return depStep ? (
                              <span key={depId} className="px-2 py-1 bg-gray-200 rounded-full text-gray-700">
                                {depStep.task}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    {step.comments?.length > 0 && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h6 className="font-medium text-gray-900 mb-2">Comments</h6>
                        <div className="space-y-2">
                          {step.comments.map((comment, idx) => (
                            <div key={idx} className="bg-white p-2 rounded border border-gray-200">
                              <p className="text-gray-600">{comment.text}</p>
                              <div className="mt-1 text-xs text-gray-500">
                                {comment.user} - {comment.date}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Last updated: {step.lastUpdated}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskMitigationPlanning;
