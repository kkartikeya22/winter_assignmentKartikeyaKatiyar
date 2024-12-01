// components/LoadingSpinner.js
import { format } from 'date-fns';

const serverDate = new Date(); // Replace this with your actual date logic
const formattedDate = format(serverDate, "Pp"); 
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-t-4 border-solid rounded-full animate-spin 
        border-t-indigo-700 border-r-purple-600 border-b-violet-600 border-l-indigo-700
        shadow-lg"></div>
      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-4 border-solid rounded-full animate-spin 
        border-t-purple-400 border-r-pink-400 border-b-purple-400 border-l-pink-400
        opacity-30 animate-[spin_1s_linear_infinite_reverse]"></div>
    </div>
  </div>
);

export default LoadingSpinner;
