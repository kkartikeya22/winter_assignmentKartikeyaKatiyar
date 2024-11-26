// components/HelpAndSupport.js
import React from 'react';

const HelpAndSupport = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Help & Support</h3>
      <p className="mb-4 text-gray-600">Get assistance with the risk management system or find answers to frequently asked questions.</p>

      <h4 className="text-md font-medium text-gray-800 mb-2">Frequently Asked Questions (FAQs)</h4>
      <ul className="list-disc pl-5 text-black">
        <li>How do I add a new risk?</li>
        <li>How can I edit an existing risk?</li>
        <li>What is the process for mitigating risks?</li>
        <li>How can I assign risks to team members?</li>
      </ul>

      <h4 className="text-md font-medium text-gray-800 mt-4 mb-2">Contact Support</h4>
      <p>If you need further assistance, please reach out to our support team:</p>
      <div className="mt-2">
        <a href="mailto:support@example.com" className="text-indigo-600 hover:text-indigo-800">
          support@example.com
        </a>
      </div>

      <p className="mt-4">For urgent issues, call us at: (123) 456-7890</p>
    </div>
  );
};

export default HelpAndSupport;
