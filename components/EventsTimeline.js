import { Disclosure, Transition } from "@headlessui/react";
import { BellIcon, ExclamationTriangleIcon, ShieldExclamationIcon, ArrowPathIcon, FunnelIcon, CalendarIcon, ClockIcon, MapPinIcon, UserIcon, ServerIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useRef } from 'react';
import { showAlert } from './Alerts';
import { format, isToday, isYesterday } from 'date-fns';

export default function EventsTimeline() {
  const scrollRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('detailed'); // 'detailed' or 'compact'
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedView, setExpandedView] = useState(null);

  const [events, setEvents] = useState([
    { 
      time: "10:00 AM", 
      date: "2024-01-20",
      event: "Large transaction flagged",
      details: "Transaction amount: $15,000. Flagged due to unusual amount for this merchant category.",
      type: "transaction",
      severity: "warning",
      merchantId: "MERCH_123",
      transactionId: "TXN_789012",
      location: "New York, USA",
      status: "pending_review",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0)",
      deviceId: "DEV_456",
      riskScore: 75,
      tags: ["high-value", "unusual-pattern"]
    },
    { 
      time: "11:30 AM",
      date: "2024-01-20", 
      event: "Multiple failed login attempts",
      details: "5 failed login attempts detected from IP: 192.168.1.1. Account temporarily locked.",
      type: "security",
      severity: "error",
      merchantId: "MERCH_123",
      ipAddress: "192.168.1.1",
      affectedUser: "admin@merchant.com",
      status: "resolved",
      deviceId: "DEV_789",
      failedAttempts: 5,
      lockDuration: "30 minutes",
      lastValidLogin: "2024-01-19 23:45:00",
      tags: ["security-threat", "account-security"]
    }
  ]);

  const [filters, setFilters] = useState({
    type: 'all',
    severity: 'all',
    status: 'all',
    dateRange: 'all',
    tags: []
  });

  // Handle refresh function
  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add a new event at the top of the list
      const newEvent = {
        time: format(new Date(), 'hh:mm a'),
        date: format(new Date(), 'yyyy-MM-dd'),
        event: "System refresh completed",
        details: "Timeline data updated successfully",
        type: "system",
        severity: "info",
        status: "active",
        tags: ["refresh", "system-update"]
      };
      
      setEvents(prev => [newEvent, ...prev]);
      showAlert("Timeline refreshed successfully", "success");
    } catch (error) {
      showAlert("Failed to refresh timeline", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = (index, newStatus) => {
    setEvents(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], status: newStatus };
      return updated;
    });
    showAlert(`Status updated to ${newStatus.replace('_', ' ')}`, "success");
  };

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(handleRefresh, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  // Responsive breakpoint detection
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  const typeIcons = {
    transaction: BellIcon,
    security: ShieldExclamationIcon,
    alert: ExclamationTriangleIcon,
    system: ArrowPathIcon
  };

  const severityStyles = {
    warning: {
      gradient: "from-amber-500 via-orange-500 to-yellow-500",
      border: "border-orange-200",
      bg: "bg-orange-50",
      text: "text-orange-800",
      shadow: "shadow-orange-100"
    },
    error: {
      gradient: "from-rose-600 via-pink-600 to-purple-600",
      border: "border-rose-200",
      bg: "bg-rose-50",
      text: "text-rose-800",
      shadow: "shadow-rose-100"
    },
    info: {
      gradient: "from-indigo-700 via-purple-600 to-violet-600",
      border: "border-indigo-200",
      bg: "bg-indigo-50",
      text: "text-indigo-800",
      shadow: "shadow-indigo-100"
    }
  };

  const filteredEvents = events
    .filter(event => {
      const matchesSearch = searchTerm === '' || 
        event.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.details.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilters = 
        (filters.type === 'all' || event.type === filters.type) &&
        (filters.severity === 'all' || event.severity === filters.severity) &&
        (filters.status === 'all' || event.status === filters.status) &&
        (filters.tags.length === 0 || event.tags?.some(tag => filters.tags.includes(tag)));

      return matchesSearch && matchesFilters;
    })
    .sort((a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`));

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-2 sm:p-4 lg:p-6 rounded-xl shadow-lg border border-gray-100 w-full max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-700 via-purple-600 to-violet-600 bg-clip-text text-transparent">
            Events Timeline
          </h2>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 px-3 py-1.5 rounded-lg text-sm border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
              />
            </div>

            <button 
              onClick={() => setViewMode(viewMode === 'detailed' ? 'compact' : 'detailed')}
              className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              {viewMode === 'detailed' ? 'Compact View' : 'Detailed View'}
            </button>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
              >
                <ArrowPathIcon className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <label className="flex items-center space-x-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
                <span className="hidden sm:inline">Auto-refresh</span>
              </label>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex flex-wrap gap-2 items-center bg-gray-50/50 p-3 rounded-lg border border-gray-100">
          <select 
            className="px-2 py-1 rounded-lg text-sm border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            <option value="all">All Types</option>
            <option value="transaction">Transaction</option>
            <option value="security">Security</option>
            <option value="alert">Alert</option>
            <option value="system">System</option>
          </select>

          <select 
            className="px-2 py-1 rounded-lg text-sm border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={filters.severity}
            onChange={(e) => setFilters({...filters, severity: e.target.value})}
          >
            <option value="all">All Severities</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>

          <select 
            className="px-2 py-1 rounded-lg text-sm border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="all">All Statuses</option>
            <option value="pending_review">Pending Review</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
            <option value="active">Active</option>
          </select>

          <div className="flex-1"></div>
          
          <span className="text-sm text-gray-500">
            Showing {filteredEvents.length} of {events.length} events
          </span>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="space-y-4 relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500 opacity-20"></div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <ExclamationTriangleIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium">No events found</p>
            <p className="text-sm">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          filteredEvents.map((item, idx) => {
            const Icon = typeIcons[item.type];
            const styles = severityStyles[item.severity];
            
            return (
              <Disclosure key={idx}>
                {({ open }) => (
                  <>
                    <div className="relative group">
                      <div className={`absolute left-7 top-4 w-4 h-4 rounded-full border-2 ${styles.border} ${styles.bg} transform -translate-x-1/2 transition-transform group-hover:scale-125`}></div>
                      
                      <Disclosure.Button
                        className={`ml-12 w-[calc(100%-3rem)] flex justify-between items-center px-4 py-3 text-sm font-medium text-left rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                          open 
                            ? `bg-gradient-to-r ${styles.gradient} text-white`
                            : `bg-white hover:bg-gray-50 text-gray-700 ${styles.border} border`
                        }`}
                      >
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <Icon className={`flex-shrink-0 w-5 h-5 ${open ? "text-white" : "text-gray-500"}`} />
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 min-w-0">
                            <div className="flex items-center space-x-2 flex-shrink-0">
                              <ClockIcon className="w-4 h-4" />
                              <span className="font-semibold">{item.time}</span>
                            </div>
                            <span className={`truncate ${open ? "text-white/90" : "text-gray-600"}`}>
                              {item.event}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`hidden sm:inline-flex text-xs px-2 py-1 rounded-full ${open ? 'bg-white/20' : styles.bg} ${open ? 'text-white' : styles.text}`}>
                            {item.status.replace('_', ' ')}
                          </span>
                          <span className="text-base">{open ? "−" : "+"}</span>
                        </div>
                      </Disclosure.Button>
                    </div>

                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel 
                        className={`ml-12 mt-2 px-4 py-3 text-sm bg-white/50 backdrop-blur-sm rounded-lg shadow-inner border border-gray-100 ${styles.shadow}`}
                      >
                        <div className="flex flex-col space-y-4">
                          <p className="text-gray-700 leading-relaxed">{item.details}</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                            {Object.entries(item).map(([key, value]) => {
                              if (['event', 'details', 'tags'].includes(key)) return null;
                              return (
                                <div key={key} className="flex items-center space-x-2 text-gray-600">
                                  <span className="font-medium capitalize">{key.replace('_', ' ')}:</span>
                                  <span className="text-gray-800">{value}</span>
                                </div>
                              );
                            })}
                          </div>

                          {item.tags && (
                            <div className="flex flex-wrap gap-2">
                              {item.tags.map((tag, tagIdx) => (
                                <span 
                                  key={tagIdx}
                                  className={`text-xs px-2 py-1 rounded-full ${styles.bg} ${styles.text}`}
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="flex items-center space-x-2">
                              <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${styles.gradient} text-white`}>
                                {item.severity}
                              </span>
                              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                {item.type}
                              </span>
                            </div>
                            
                            <select
                              value={item.status}
                              onChange={(e) => handleStatusUpdate(idx, e.target.value)}
                              className="text-xs px-2 py-1 rounded-lg border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                              <option value="pending_review">Pending Review</option>
                              <option value="investigating">Investigating</option>
                              <option value="resolved">Resolved</option>
                              <option value="active">Active</option>
                            </select>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            );
          })
        )}
      </div>
    </div>
  );
}
