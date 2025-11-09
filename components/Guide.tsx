import React from 'react';

interface GuideProps {
  onStartAudit: () => void;
}

const GuideStep: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 bg-brand-turquoise text-white rounded-full h-12 w-12 flex items-center justify-center shadow-md">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-bold text-brand-gray font-display">{title}</h4>
      <p className="mt-1 text-gray-600">{description}</p>
    </div>
  </div>
);

const Guide: React.FC<GuideProps> = ({ onStartAudit }) => {
  return (
    <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl border border-gray-100 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-brand-gray font-display">How to Use the AI Brand Audit Tool</h2>
        <p className="mt-2 text-gray-600">Follow these simple steps to get your free, in-depth brand analysis.</p>
      </div>
      <div className="space-y-8">
        <GuideStep
          icon={<FormIcon />}
          title="1. Enter Business Details"
          description="Start by providing your business name, website, and a contact email. The more accurate the information, the better the audit."
        />
        <GuideStep
          icon={<LinkIcon />}
          title="2. Add Social & Reputation Links (Optional)"
          description="For a comprehensive analysis, include links to your social media profiles and provide any known customer reputation data."
        />
        <GuideStep
          icon={<SparklesIcon />}
          title="3. Generate Your Report"
          description="Click the 'Generate' button and our AI will perform a live analysis of your digital presence. This might take a moment."
        />
        <GuideStep
          icon={<DocumentDownloadIcon />}
          title="4. Review Report"
          description="Explore your detailed report with scores, analysis, and actionable recommendations."
        />
      </div>
      <div className="mt-10 pt-6 border-t border-gray-200">
        <button
          onClick={onStartAudit}
          className="w-full bg-brand-turquoise text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

// Icons
const FormIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
const DocumentDownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;


export default Guide;