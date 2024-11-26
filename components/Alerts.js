// components/Alert.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to show alerts with custom styling
export const showAlert = (message) => {
  toast.warn(message, {
    position: 'top-right',
    autoClose: 5000,
    className: 'bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-500 text-white rounded-lg shadow-xl p-4 flex items-center space-x-4',
    bodyClassName: 'text-white', // Customize the body text color
    progressClassName: 'bg-purple-400', // Custom progress bar color
    style: {
      background: 'rgba(45, 52, 54, 0.85)', // Adjusted background opacity
    }
  });
};

const Alert = () => {
  return (
    <div>
      {/* Optionally you can add a component or wrapper for alerts if needed */}
    </div>
  );
};

export default Alert;
