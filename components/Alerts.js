// components/Alert.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

// Refined severity configurations with accessibility considerations
const SEVERITY_CONFIGS = {
  critical: {
    icon: '🚨',
    gradient: 'from-red-600 via-rose-600 to-pink-600',
    progressBar: 'bg-rose-400',
    autoClose: 0,
    ariaLabel: 'Critical Alert',
    vibrate: true, // For mobile devices
  },
  warning: {
    icon: '⚠️',
    gradient: 'from-amber-500 via-orange-500 to-yellow-500',
    progressBar: 'bg-orange-400',
    autoClose: 8000,
    ariaLabel: 'Warning Alert',
    vibrate: false,
  },
  info: {
    icon: 'ℹ️',
    gradient: 'from-indigo-600 via-purple-600 to-violet-600',
    progressBar: 'bg-purple-400',
    autoClose: 5000,
    ariaLabel: 'Information Alert',
    vibrate: false,
  },
  success: {
    icon: '✅',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    progressBar: 'bg-teal-400',
    autoClose: 4000,
    ariaLabel: 'Success Alert',
    vibrate: false,
  }
};

// Enhanced alert function with responsive design and accessibility
export const showAlert = (config) => {
  const { 
    message, 
    severity = 'info', 
    details = null,
    timestamp = new Date().toISOString(),
    source = null,
    impactLevel = null,
    category = null,
    actionRequired = null,
    relatedEvents = []
  } = config;

  const severityConfig = SEVERITY_CONFIGS[severity];
  const isMobile = window.innerWidth < 768;

  // Vibration pattern for critical alerts on mobile
  if (severityConfig.vibrate && 'vibrate' in navigator) {
    navigator.vibrate([200, 100, 200]);
  }

  const toastContent = (
    <div 
      className="flex flex-col space-y-2 w-full"
      role="alert"
      aria-label={severityConfig.ariaLabel}
    >
      <div className="flex items-center space-x-3">
        <span className="text-xl" role="img" aria-label={severity}>{severityConfig.icon}</span>
        <span className="font-medium text-sm md:text-base">{message}</span>
      </div>
      {details && (
        <div className="text-xs md:text-sm opacity-90 mt-2 border-t border-white/20 pt-2 transition-all duration-300">
          <div className="font-medium">{details}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-2">
            {source && (
              <div className="flex items-center space-x-2">
                <span className="opacity-75">Source:</span>
                <span className="font-medium">{source}</span>
              </div>
            )}
            {impactLevel && (
              <div className="flex items-center space-x-2">
                <span className="opacity-75">Impact:</span>
                <span className={`font-medium ${impactLevel === 'High' ? 'text-red-300' : impactLevel === 'Medium' ? 'text-yellow-300' : 'text-green-300'}`}>
                  {impactLevel}
                </span>
              </div>
            )}
            {category && (
              <div className="flex items-center space-x-2">
                <span className="opacity-75">Category:</span>
                <span className="font-medium">{category}</span>
              </div>
            )}
          </div>
          {actionRequired && (
            <div className="mt-2 p-2 bg-white/10 rounded-md">
              <span className="font-medium">Action Required: </span>
              {actionRequired}
            </div>
          )}
          {relatedEvents.length > 0 && (
            <div className="mt-2 text-xs">
              <span className="opacity-75">Related Events: </span>
              {relatedEvents.join(', ')}
            </div>
          )}
          <div className="text-xs opacity-75 mt-2">
            {new Date(timestamp).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );

  toast(toastContent, {
    position: isMobile ? 'bottom-center' : 'top-right',
    autoClose: severityConfig.autoClose,
    className: `bg-gradient-to-r ${severityConfig.gradient} text-white rounded-lg shadow-2xl p-3 md:p-4 max-w-[90vw] md:max-w-md lg:max-w-lg`,
    bodyClassName: 'text-white w-full',
    progressClassName: severityConfig.progressBar,
    style: {
      background: 'rgba(17, 24, 39, 0.97)',
    },
    closeButton: true,
    pauseOnHover: true,
    draggable: true,
    onClick: () => {}, // Handle click interactions
  });
};

// Enhanced dashboard alerts with more detailed information
const DASHBOARD_ALERTS = [
  {
    message: "Unusual login activity detected",
    severity: "warning",
    details: "Multiple failed login attempts detected from unauthorized IP address",
    source: "Security Monitor",
    impactLevel: "Medium",
    category: "Security",
    actionRequired: "Review login attempts and consider enabling 2FA",
    relatedEvents: ["Failed password reset", "IP blacklist attempt"]
  },
  {
    message: "System performance degraded",
    severity: "info",
    details: "Resource utilization exceeding normal thresholds",
    source: "System Monitor",
    impactLevel: "Low",
    category: "Performance",
    actionRequired: "Monitor system resources and optimize if needed",
    relatedEvents: ["High CPU usage", "Memory pressure"]
  },
  {
    message: "Critical security update required",
    severity: "critical",
    details: "Urgent security patch required to address vulnerability",
    source: "Security Center",
    impactLevel: "High",
    category: "Security",
    actionRequired: "Install security patch KB123456 immediately",
    relatedEvents: ["CVE-2023-XXXX", "System scan alert"]
  }
];

const Alert = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    // Show initial alerts when dashboard loads
    DASHBOARD_ALERTS.forEach((alert, index) => {
      setTimeout(() => {
        showAlert({
          ...alert,
          timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString()
        });
      }, index * (isMobile ? 2000 : 1000)); // Longer delay on mobile
    });
  }, [refreshKey]); // Refreshing dashboard will trigger alerts again

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* ToastContainer is rendered at the app root level */}
    </div>
  );
};

export default Alert;
