// components/HelpAndSupport.js
import React from 'react';

const HelpAndSupport = () => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-3 sm:p-5 md:p-6 lg:p-8 xl:p-10 rounded-xl shadow-lg border border-gray-100 animate-fade-in max-w-7xl mx-auto">
      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold bg-gradient-to-r from-indigo-700 via-purple-600 to-violet-600 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-5 lg:mb-6 animate-slide-down">
        Help & Support
      </h3>
      <p className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 animate-fade-in leading-relaxed">
        Get assistance with the risk management system or find answers to frequently asked questions.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        <div className="transform transition duration-300 hover:scale-[1.02] bg-white/50 backdrop-blur-sm p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl shadow-md hover:shadow-xl border border-gray-100">
          <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-5">
            Frequently Asked Questions (FAQs)
          </h4>
          <ul className="space-y-2 sm:space-y-3 md:space-y-4 pl-4 sm:pl-5 md:pl-6 text-gray-700">
            {[
              "How do I add a new risk?",
              "How can I edit an existing risk?",
              "What is the process for mitigating risks?",
              "How can I assign risks to team members?",
              "How can I generate risk reports?",
              "What are the different risk severity levels?"
            ].map((faq, index) => (
              <li 
                key={index} 
                className="hover:text-indigo-600 transition-all duration-200 cursor-pointer animate-slide-up text-xs sm:text-sm md:text-base lg:text-lg flex items-center space-x-2 group"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-125 transition-transform duration-200"></span>
                <span>{faq}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
          <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl shadow-md transform transition duration-300 hover:shadow-xl border border-gray-100">
            <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-3 sm:mb-4">
              Contact Support
            </h4>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-4 sm:mb-5">
              If you need further assistance, please reach out to our support team:
            </p>
            <div className="space-y-3 sm:space-y-4">
              <a 
                href="mailto:support@example.com" 
                className="inline-block px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 text-xs sm:text-sm md:text-base lg:text-lg shadow-md hover:shadow-xl"
              >
                support@example.com
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">
              Emergency Contact
            </h4>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium">
              <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                For urgent issues, call our 24/7 support line:
              </span>
              <a 
                href="tel:+1234567890" 
                className="block mt-2 text-sm sm:text-base md:text-lg lg:text-xl text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              >
                (123) 456-7890
              </a>
            </p>
            <p className="mt-3 text-xs sm:text-sm text-gray-500">
              Available 24 hours a day, 7 days a week
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 md:mt-10 p-4 sm:p-5 md:p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 animate-fade-in">
        <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-3">
          Additional Resources
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs sm:text-sm md:text-base">
          <div className="p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <span className="font-medium text-indigo-600">Documentation</span>
            <p className="text-gray-600 mt-1">Complete system guides</p>
          </div>
          <div className="p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <span className="font-medium text-purple-600">Video Tutorials</span>
            <p className="text-gray-600 mt-1">Step-by-step instructions</p>
          </div>
          <div className="p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <span className="font-medium text-pink-600">Knowledge Base</span>
            <p className="text-gray-600 mt-1">Detailed articles & tips</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport;
