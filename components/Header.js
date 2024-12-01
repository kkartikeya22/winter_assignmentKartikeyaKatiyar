import { format } from 'date-fns';

const serverDate = new Date(); // Replace this with your actual date logic
const formattedDate = format(serverDate, "Pp"); 
export default function Header() {
    return (
      <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-500 text-white p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm">
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
          {/* Left section - Merchant Info */}
          <div className="flex items-start space-x-3 sm:space-x-4 md:space-x-6">
            {/* Logo Section */}
            <div className="relative group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center border-2 border-white/20 overflow-hidden">
                {/* Placeholder for merchant logo/image */}
                <span className="text-xl sm:text-2xl md:text-3xl">🏪</span>
              </div>
              <div className="hidden group-hover:block absolute top-full mt-2 bg-gray-900/95 text-xs text-white p-2 rounded-md whitespace-nowrap">
                Click to update logo
              </div>
            </div>

            {/* Merchant Details */}
            <div className="flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-200">
                Merchant Investigation Dashboard
              </h1>
              
              <div className="mt-1 sm:mt-2 space-y-1 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
                <div className="flex items-center space-x-2 text-xs sm:text-sm md:text-base text-gray-200">
                  <span className="px-2 py-0.5 bg-white/10 rounded-md">ID: MER-12345</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="px-2 py-0.5 bg-white/10 rounded-md">Active</span>
                </div>
                <div className="hidden sm:flex items-center space-x-2 text-xs sm:text-sm md:text-base text-gray-200">
                  <span className="px-2 py-0.5 bg-white/10 rounded-md">Risk Level: Low</span>
                  <span className="px-2 py-0.5 bg-white/10 rounded-md">Since: 2023</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right section - Search */}
          <div className="relative w-full lg:w-96 xl:w-[450px]">
            <input 
              type="search"
              placeholder="Search merchants or transactions..."
              className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-white/10 border border-white/20 
                placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30 
                text-sm sm:text-base transition-all duration-300 
                hover:bg-white/15 focus:bg-white/15"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              <span className="text-gray-300 text-sm hidden sm:block">Press /</span>
              <span className="text-lg">🔍</span>
            </div>
            
            {/* Search Hotkey Tooltip */}
            <div className="hidden sm:block absolute -bottom-8 right-0 text-xs text-gray-300 bg-gray-900/95 px-2 py-1 rounded-md">
              Press "/" to focus search
            </div>
          </div>
        </div>
      </header>
    );
  }