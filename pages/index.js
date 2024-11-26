import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import EventsTimeline from '../components/EventsTimeline';
import LoadingSpinner from '../components/LoadingSpinner';
import RiskAssessmentSection from '../components/RiskAssessmentSection';
import RiskHeatmap from '../components/RiskHeatmap';
import RiskOverview from '../components/RiskOverview';
import RiskList from '../components/RiskList';
import RiskSummary from '../components/RiskSummary';
import { showAlert } from '../components/Alerts';

import RiskRegister from '../components/RiskRegister'; 
import RiskDetails from '../components/RiskDetails'; 
import RiskMitigationPlanning from '../components/RiskMitigationPlanning'; 
import ReportsAndAnalytics from '../components/ReportsAndAnalytics'; 
import UserRolesAndPermissions from '../components/UserRolesAndPermissions'; 
import HelpAndSupport from '../components/HelpAndSupport'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [loading, setLoading] = useState(false);

    // Simulate a loading state for demonstration
    const fetchData = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            showAlert("Data loaded successfully!");
        }, 3000); // Simulate a 3-second delay for data fetching
    };

    useEffect(() => {
        // Example for adding Google Fonts dynamically (if desired)
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
        document.head.appendChild(link);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-500 font-poppins">
            <ToastContainer />
            <div className="max-w-7xl mx-auto p-6 bg-white rounded-3xl shadow-lg">

                {/* Header Component */}
                <Header />

                {/* Button to trigger the fetchData (for demonstration) */}
                <div className="flex justify-center mt-8">
                    <button
                        className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-8 py-3 rounded-full shadow-lg hover:bg-gradient-to-l hover:scale-105 transition-all transform"
                        onClick={fetchData}
                    >
                        Load Data
                    </button>
                </div>

                {/* Loading Spinner or Main Content */}
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">

                        {/* Risk Overview */}
                        <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-8 rounded-2xl shadow-lg col-span-2 xl:col-span-2 hover:shadow-2xl transition-shadow duration-300">
                            <RiskOverview totalRisks={100} criticalRisks={10} />
                        </div>

                        {/* Risk Summary */}
                        <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-8 rounded-2xl shadow-lg col-span-1 xl:col-span-1 hover:shadow-2xl transition-shadow duration-300">
                            <RiskSummary />
                        </div>

                        {/* Risk Heatmap */}
                        <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-2xl shadow-lg col-span-2 xl:col-span-2 hover:shadow-2xl transition-shadow duration-300">
                            <RiskHeatmap />
                        </div>

                        {/* Risk Assessment Section */}
                        <div className="bg-gradient-to-r from-green-400 to-teal-500 p-8 rounded-2xl shadow-lg col-span-2 xl:col-span-2 hover:shadow-2xl transition-shadow duration-300">
                            <RiskAssessmentSection />
                        </div>

                        {/* Risk Register */}
                        <div className="col-span-1 lg:col-span-2 xl:col-span-2 bg-gradient-to-r from-indigo-500 to-indigo-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <RiskRegister />
                        </div>

                        {/* Risk Details */}
                        <div className="col-span-1 lg:col-span-2 xl:col-span-2 bg-gradient-to-r from-blue-400 to-indigo-600 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <RiskDetails riskId={1} />
                        </div>

                        {/* Risk Mitigation Planning */}
                        <div className="col-span-1 lg:col-span-2 xl:col-span-2 bg-gradient-to-r from-teal-500 to-green-600 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <RiskMitigationPlanning />
                        </div>

                        {/* Reports and Analytics */}
                        <div className="col-span-1 xl:col-span-2 bg-gradient-to-r from-orange-400 to-red-600 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <ReportsAndAnalytics />
                        </div>

                        {/* User Roles and Permissions */}
                        <div className="col-span-1 bg-gradient-to-r from-pink-400 to-purple-600 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <UserRolesAndPermissions />
                        </div>

                        {/* Events Timeline */}
                        <div className="col-span-1 xl:col-span-3 bg-gradient-to-r from-teal-500 to-blue-600 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <EventsTimeline />
                        </div>

                        {/* Help and Support Section */}
                        <div className="col-span-1 xl:col-span-4 bg-indigo-700 text-white p-8 rounded-2xl shadow-lg mt-8 hover:shadow-2xl transition-shadow duration-300">
                            <HelpAndSupport />
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
