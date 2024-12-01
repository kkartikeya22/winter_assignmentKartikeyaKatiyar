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
import RiskVisualization from '../components/RiskVisualization';
import InvestigationStatus from '../components/InvestigationStatus';
import TransactionPattern from '../components/TransactionPattern';
import TransactionStatistics from '../components/TransactionStatistics';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';

const serverDate = new Date(); // Replace this with your actual date logic
const formattedDate = format(serverDate, "Pp"); 
const App = () => {
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
        document.head.appendChild(link);
    }, []);

    const refreshData = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setLastUpdated(new Date());
            showAlert("Dashboard refreshed successfully!");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-700 font-poppins">
            <ToastContainer position="top-right" theme="dark" />
            <div className="max-w-8xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <Header />
                    <div className="mt-4 flex justify-between items-center">
                        <p className="text-white/70 text-sm">
                            Last updated: {lastUpdated.toLocaleString()}
                        </p>
                        <button onClick={refreshData} className="refresh-button">
                            <div className="refresh-button-inner">
                                <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh Dashboard
                            </div>
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center min-h-[600px]">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Top Row - Key Metrics */}
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 xl:col-span-4">
                                <RiskSummary riskScore="High" totalTransactions={8432} recentAlerts={15} failedTransactions={34} />
                            </div>
                            <div className="col-span-12 xl:col-span-8">
                                <RiskOverview totalRisks={187} criticalRisks={28} />
                            </div>
                        </div>

                        {/* User Roles & Permissions - Full Width */}
                        <div className="col-span-12">
                            <UserRolesAndPermissions />
                        </div>

                        {/* Risk Visualization Row */}
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 xl:col-span-8">
                                <RiskVisualization />
                            </div>
                            <div className="col-span-12 xl:col-span-4">
                                <RiskHeatmap />
                            </div>
                        </div>

                        {/* Transaction Intelligence Row */}
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 md:col-span-4">
                                <TransactionPattern />
                            </div>
                            <div className="col-span-12 md:col-span-4">
                                <TransactionStatistics />
                            </div>
                            <div className="col-span-12 md:col-span-4">
                                <InvestigationStatus />
                            </div>
                        </div>

                        {/* Risk Management Row */}
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 xl:col-span-6">
                                <RiskRegister />
                            </div>
                            <div className="col-span-12 xl:col-span-6">
                                <RiskDetails riskId={1} />
                            </div>
                        </div>

                        {/* Assessment & Analytics Row */}
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 xl:col-span-8">
                                <RiskAssessmentSection />
                            </div>
                            <div className="col-span-12 xl:col-span-4">
                                <ReportsAndAnalytics />
                            </div>
                        </div>

                        {/* Risk Mitigation & List Row */}
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 xl:col-span-8">
                                <RiskMitigationPlanning />
                            </div>
                            <div className="col-span-12 xl:col-span-4">
                                <RiskList />
                            </div>
                        </div>

                        {/* Timeline - Full Width */}
                        <div className="col-span-12">
                            <EventsTimeline />
                        </div>

                        {/* Help & Support - Full Width */}
                        <div className="col-span-12">
                            <HelpAndSupport />
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .refresh-button {
                    @apply relative group;
                }
                .refresh-button-inner {
                    @apply bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-lg 
                           shadow-lg backdrop-blur-sm transition-all duration-300 
                           flex items-center gap-2 
                           border-2 border-white/20 hover:border-white/40
                           relative z-10;
                }
                .refresh-button::before {
                    content: '';
                    @apply absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-violet-500 
                           rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300
                           blur z-0;
                }
                .glass-morphism {
                    @apply bg-white/5 backdrop-blur-sm rounded-xl shadow-xl 
                           border border-white/10 p-6 hover:bg-white/[0.07] 
                           transition-all duration-300;
                }
            `}</style>
        </div>
    );
};

export default App;
