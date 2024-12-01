import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const serverDate = new Date(); // Replace this with your actual date logic
const formattedDate = format(serverDate, "Pp"); 
export default function InvestigationStatus({
  caseId = "INV-2024-001",
  assignee = {
    name: "John Doe", 
    avatar: "https://i.pravatar.cc/150?u=johndoe",
    role: "Senior Investigator",
    department: "Financial Crimes Unit"
  },
  currentStage = "in_progress",
  startDate = "2024-01-15",
  priority = "high",
  dueDate = "2024-02-15",
  relatedCases = ["INV-2023-089", "INV-2023-124"],
  notes = [],
  attachments = [],
  metrics = {
    daysOpen: 12,
    totalActivities: 34,
    riskScore: 85
  }
}) {
  const [newNote, setNewNote] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);

  const stages = [
    { id: 'assigned', label: 'Assigned', color: 'bg-blue-500', icon: '📋' },
    { id: 'in_progress', label: 'In Progress', color: 'bg-yellow-500', icon: '🔍' },
    { id: 'review', label: 'Under Review', color: 'bg-purple-500', icon: '📝' },
    { id: 'escalated', label: 'Escalated', color: 'bg-red-500', icon: '⚠️' },
    { id: 'pending_info', label: 'Pending Information', color: 'bg-orange-500', icon: '⏳' },
    { id: 'completed', label: 'Completed', color: 'bg-green-500', icon: '✅' }
  ];

  const currentStageIndex = stages.findIndex(stage => stage.id === currentStage);

  const getPriorityColor = (priority) => {
    switch(priority.toLowerCase()) {
      case 'critical': return 'text-red-700 bg-red-50 border-red-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      case 'low': return 'text-green-600 bg-green-50 border-green-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-700 via-purple-600 to-violet-600 bg-clip-text text-transparent">
            Investigation #{caseId}
          </h2>
          <div className={`self-start px-3 py-1 rounded-full text-sm font-semibold border ${getPriorityColor(priority)}`}>
            {priority.toUpperCase()} Priority
          </div>
        </div>
        
        <button className="self-start px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
          Mark as Resolved
        </button>
      </div>

      {/* Main Content - Vertical Layout */}
      <div className="space-y-6">
        {/* Assignee Card */}
        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center gap-4">
            <img src={assignee.avatar} alt={assignee.name} className="w-16 h-16 rounded-full" />
            <div>
              <h3 className="font-medium text-gray-900">{assignee.name}</h3>
              <p className="text-sm text-gray-600">{assignee.role}</p>
              <p className="text-sm text-gray-600">{assignee.department}</p>
            </div>
          </div>
        </div>

        {/* Timeline Progress */}
        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Investigation Progress</h3>
          <div className="space-y-6">
            {stages.map((stage, index) => (
              <div key={stage.id} className="relative">
                {index !== stages.length - 1 && (
                  <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200" />
                )}
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index <= currentStageIndex ? stage.color : 'bg-gray-200'
                  }`}>
                    <span className="text-white text-sm">{stage.icon}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex flex-col gap-1">
                      <span className={`font-medium ${
                        index <= currentStageIndex ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {stage.label}
                      </span>
                      {index <= currentStageIndex && (
                        <span className="text-sm text-gray-500">
                          {index === currentStageIndex ? 'Current Stage' : 'Completed'}
                        </span>
                      )}
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mt-2">
                        <div 
                          className={`h-full ${stage.color} transition-all duration-500`}
                          style={{ width: index <= currentStageIndex ? '100%' : '0%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            <button className="p-3 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
              Request Additional Information
            </button>
            <button className="p-3 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              Schedule Case Review
            </button>
            <button className="p-3 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              Escalate Investigation
            </button>
            <button className="p-3 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              Export Investigation Report
            </button>
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Investigation Notes</h3>
          <div className="space-y-4">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a note..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              rows="3"
            />
            <button
              onClick={() => setNewNote('')}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add Note
            </button>
          </div>
          <div className="space-y-4 mt-6 max-h-[300px] overflow-y-auto">
            {notes.map((note, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <img src={note.avatar} alt={note.author} className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="font-medium text-gray-900">{note.author}</p>
                    <p className="text-xs text-gray-500">{formatDate(note.timestamp)}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-800">{note.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


