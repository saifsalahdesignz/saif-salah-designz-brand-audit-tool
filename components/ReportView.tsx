import React from 'react';
import type { AuditReport, CriteriaAudit, AnalysisItem, SocialMediaPlatformAudit, TechStackAudit, TrafficInsightsAudit, CompetitorComparison, WebsiteAudit } from '../types';
import CTA from './CTA';


interface ReportViewProps {
  report: AuditReport;
  onNewAudit: () => void;
}

const getScoreDescription = (score: number): string => {
  if (score >= 80) return `Score: ${score}/100 - Excellent standing. This area is a strong asset for your brand.`;
  if (score >= 60) return `Score: ${score}/100 - Good performance. There are minor opportunities for improvement.`;
  if (score >= 40) return `Score: ${score}/100 - Needs Improvement. This area requires attention to meet industry standards.`;
  return `Score: ${score}/100 - Poor. This is a critical area that needs immediate action to improve brand health.`;
};


const ScoreCircle: React.FC<{ score: number }> = ({ score }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;
  
  let colorClass = 'stroke-brand-turquoise';
  if (score < 75) colorClass = 'stroke-yellow-500';
  if (score < 50) colorClass = 'stroke-red-500';

  return (
    <div className="relative flex items-center justify-center w-32 h-32 break-inside-avoid" role="img" aria-label={getScoreDescription(score)} title={getScoreDescription(score)}>
      <svg className="transform -rotate-90" width="120" height="120" viewBox="0 0 100 100">
        <circle className="text-gray-200" strokeWidth="10" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
        <circle
          className={`${colorClass} transition-all duration-1000 ease-out`}
          strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          stroke="currentColor" fill="transparent" r="45" cx="50" cy="50"
        />
      </svg>
      <span className="absolute text-3xl font-bold text-brand-gray" aria-hidden="true">{score}</span>
    </div>
  );
};

const ProgressBar: React.FC<{ score: number }> = ({ score }) => {
    let colorClass = 'bg-brand-turquoise';
    if (score < 75) colorClass = 'bg-yellow-500';
    if (score < 50) colorClass = 'bg-red-500';

    return (
        <div 
            className="w-full bg-gray-200 rounded-full h-2.5" 
            role="progressbar"
            aria-valuenow={score}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={getScoreDescription(score)}
            title={getScoreDescription(score)}
        >
            <div className={`${colorClass} h-2.5 rounded-full`} style={{ width: `${score}%` }}></div>
        </div>
    );
};


const AnalysisPoint: React.FC<{ item: AnalysisItem }> = ({ item }) => {
    const pointText = item && typeof item.point === 'string' ? item.point.trim() : '';
    const rationaleText = item && (typeof item.rationale === 'string' 
        ? item.rationale.trim()
        : (item.rationale && typeof (item.rationale as any).rationale === 'string') 
            ? (item.rationale as any).rationale.trim()
            : '');

    if (!pointText) return null;

    return (
        <li className="mb-3 break-inside-avoid">
            <p className="font-semibold text-brand-gray">{pointText}</p>
            {rationaleText && (
                 <p className="text-sm text-gray-600 pl-4 border-l-2 border-cyan-200 ml-1 mt-1 italic">
                    <strong>Rationale:</strong> {rationaleText}
                </p>
            )}
        </li>
    );
};

const ReportSection: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode; id?: string }> = ({ title, children, icon, id }) => (
    <div id={id} className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 break-inside-avoid">
        <div className="flex items-center mb-4">
            <div className="mr-3 text-brand-turquoise">{icon}</div>
            <h3 className="text-2xl font-bold text-brand-gray font-display">{title}</h3>
        </div>
        {children}
    </div>
);

const PlaceholderImageLoader: React.FC = () => (
    <div className="flex flex-col items-center justify-center p-4 bg-cyan-50 border border-cyan-200 rounded-lg mt-4 animate-pulse">
        <SparklesIcon className="w-8 h-8 text-brand-turquoise" />
        <p className="text-sm font-semibold text-brand-gray mt-2">Generating AI Suggestion...</p>
    </div>
);

const CriteriaCard: React.FC<{ title: string; data?: CriteriaAudit, placeholderImage?: string; imageType?: string; }> = ({ title, data, placeholderImage, imageType }) => {
    if (!data) {
        return (
             <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 break-inside-avoid">
                <h4 className="font-bold text-md text-brand-gray font-display">{title}</h4>
                <p className="text-sm text-gray-500 mt-2 italic">Analysis for this category was not available.</p>
            </div>
        );
    }

    const isLoadingPlaceholder = placeholderImage === 'loading' && data && data.score < 70;
    const showPlaceholder = placeholderImage && placeholderImage !== 'loading' && data && data.score < 70;

    return (
        <div className="p-4 border border-gray-200 rounded-lg break-inside-avoid">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-md text-brand-gray font-display">{title}</h4>
                <span className="font-bold text-brand-turquoise">{typeof data.score === 'number' ? data.score : 'N/A'}/100</span>
            </div>
            
            {typeof data.score === 'number' && <ProgressBar score={data.score} />}
            
            {isLoadingPlaceholder && <PlaceholderImageLoader />}
            
            {showPlaceholder && (
                <div className="mt-4 p-2 bg-cyan-50 border border-cyan-200 rounded-lg">
                    <h5 className="font-bold text-sm text-brand-gray mb-2 flex items-center">
                        <SparklesIcon className="w-5 h-5 mr-2 text-brand-turquoise" />
                        <span>AI-Generated Improvement Suggestion</span>
                    </h5>
                    <img src={placeholderImage} alt={`AI-generated placeholder for ${title}`} className={`rounded-md w-full ${imageType === 'logo' ? 'object-contain h-48 bg-white' : 'object-cover h-48'}`} />
                    <p className="text-xs text-gray-500 mt-2 italic">This is an AI-generated concept to inspire improvements for your {imageType}.</p>
                </div>
            )}

            {data.analysis && data.analysis.length > 0 ? (
                <ul className="mt-4 space-y-2 text-sm">
                    {data.analysis.map((item, index) => <AnalysisPoint key={index} item={item} />)}
                </ul>
            ) : (
                 <p className="text-sm text-gray-500 mt-2 italic">No detailed analysis points provided.</p>
            )}
        </div>
    );
};

const TechStackCard: React.FC<{ data: TechStackAudit }> = ({ data }) => (
    <div className="p-4 border border-gray-200 rounded-lg break-inside-avoid">
        <h4 className="font-bold text-md text-brand-gray font-display mb-3">Detected Technology Stack</h4>
        {data.toolsDetected && data.toolsDetected.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-4">
                {data.toolsDetected.map((tool, i) => (
                    <span key={i} className="bg-cyan-50 text-brand-turquoise text-xs font-semibold px-3 py-1 rounded-full border border-cyan-100">{tool}</span>
                ))}
            </div>
        ) : (
            <p className="text-sm text-gray-500 mb-4 italic">No specific technologies detected.</p>
        )}
        {data.analysis && data.analysis.length > 0 && (
            <ul className="space-y-2 text-sm">
                {data.analysis.map((item, index) => <AnalysisPoint key={index} item={item} />)}
            </ul>
        )}
    </div>
);

const TrafficCard: React.FC<{ data: TrafficInsightsAudit }> = ({ data }) => (
    <div className="p-4 border border-gray-200 rounded-lg break-inside-avoid">
        <h4 className="font-bold text-md text-brand-gray font-display mb-2">Approximate Traffic & Engagement</h4>
        <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-500 uppercase">Monthly Visits (est.)</p>
                <p className="text-xl font-bold text-brand-turquoise">{data.estimatedMonthlyVisits || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-500 uppercase">Engagement Level</p>
                <p className="text-xl font-bold text-brand-turquoise">{data.engagementLevel || 'N/A'}</p>
            </div>
        </div>
         {data.analysis && data.analysis.length > 0 && (
            <ul className="space-y-2 text-sm">
                {data.analysis.map((item, index) => <AnalysisPoint key={index} item={item} />)}
            </ul>
        )}
        <p className="text-xs text-gray-400 mt-3 italic">*Metrics are approximations based on public data signals and may vary from actual analytics.</p>
    </div>
);

const CompetitorCard: React.FC<{ data: CompetitorComparison }> = ({ data }) => (
    <div className="p-4 border border-gray-200 rounded-lg break-inside-avoid mb-4">
        <h5 className="font-bold text-md text-brand-gray font-display mb-1">{data.competitorName || 'Competitor'}</h5>
        <p className="text-xs text-gray-500 mb-3 break-all">{data.competitorUrl}</p>
        {data.comparisonPoints && data.comparisonPoints.length > 0 ? (
            <ul className="space-y-2 text-sm">
                {data.comparisonPoints.map((item, index) => <AnalysisPoint key={index} item={item} />)}
            </ul>
        ) : (
            <p className="text-sm text-gray-500 italic">No comparison data available.</p>
        )}
    </div>
);

const SocialPlatformCard: React.FC<{ data: SocialMediaPlatformAudit }> = ({ data }) => {
    return (
        <div className="p-4 border border-gray-200 rounded-lg break-inside-avoid">
            <div className="flex items-center mb-3">
                <SocialIcon platformName={data.platform} />
                <span className="ml-2 font-display font-bold text-lg">{data.platform}</span>
                <span className="ml-auto text-brand-turquoise font-bold">{data.overallScore}/100</span>
            </div>
            <div className="space-y-4">
                <CriteriaCard title="Profile Branding" data={data.profileBranding} />
                <CriteriaCard title="Content Consistency" data={data.contentConsistency} />
                <CriteriaCard title="Engagement Tactics" data={data.engagementTactics} />
            </div>
            {data.actionableTips && data.actionableTips.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 print:hidden">
                    <h5 className="font-bold text-md text-brand-gray mb-2 flex items-center font-display">
                        <LightbulbIcon />
                        <span className="ml-2">Actionable Tips</span>
                    </h5>
                    <ul className="space-y-2 text-sm">
                       {data.actionableTips.map((tip, index) => {
                           const pointText = tip && typeof tip.point === 'string' ? tip.point.trim() : '';
                           const rationaleText = tip && (typeof tip.rationale === 'string' 
                               ? tip.rationale.trim()
                               : (tip.rationale && typeof (tip.rationale as any).rationale === 'string') 
                                   ? (tip.rationale as any).rationale.trim()
                                   : '');

                           if (!pointText && !rationaleText) return null;

                           return (
                               <li key={index} className="p-2 bg-cyan-50 rounded-md break-inside-avoid">
                                   {pointText && <p className="font-semibold text-brand-gray">{pointText}</p>}
                                   {rationaleText && <p className="text-gray-600">{rationaleText}</p>}
                               </li>
                           );
                       })}
                    </ul>
                </div>
            )}
        </div>
    );
};

const RecommendationCard: React.FC<{ item: AnalysisItem }> = ({ item }) => {
    const pointText = item && typeof item.point === 'string' ? item.point.trim() : '';
    const rationaleText = item && (typeof item.rationale === 'string' 
        ? item.rationale.trim()
        : (item.rationale && typeof (item.rationale as any).rationale === 'string') 
            ? (item.rationale as any).rationale.trim()
            : '');

    if (!pointText && !rationaleText) {
        return null;
    }

    return (
        <div className="bg-cyan-50 p-4 rounded-lg border-l-4 border-brand-turquoise shadow-sm flex items-center space-x-4 break-inside-avoid">
            <div className="flex-shrink-0 bg-brand-turquoise text-white rounded-full h-12 w-12 flex items-center justify-center shadow">
                <LightbulbIcon />
            </div>
            <div className="flex-1">
                {pointText && <h4 className="font-bold text-lg text-brand-gray font-display">{pointText}</h4>}
                {rationaleText && <p className={`mt-1 text-gray-600 ${!pointText ? 'font-semibold' : ''}`}>{rationaleText}</p>}
            </div>
        </div>
    );
};

const BrandComplianceDetails: React.FC<{ website: WebsiteAudit, social: SocialMediaPlatformAudit[] }> = ({ website, social }) => {
    const compliancePoints: { category: string; strength?: string; weakness?: string }[] = [];

    const avgSocialBrandingScore = social.length > 0
        ? social.reduce((acc, s) => acc + (s.profileBranding?.score || 0), 0) / social.length
        : 0;

    if (website.logo?.score > 80 && avgSocialBrandingScore > 80) {
        compliancePoints.push({
            category: "Logo & Visual Identity",
            strength: "Excellent consistency in logo usage between the website and social media profiles, reinforcing brand recognition."
        });
    } else if (website.logo?.score < 60 || (social.length > 0 && avgSocialBrandingScore < 60)) {
        compliancePoints.push({
            category: "Logo & Visual Identity",
            weakness: "Inconsistent logo application or quality noted between the website and social media profiles. Ensuring the same high-resolution logo is used everywhere is crucial."
        });
    }

    if (website.colorPalette?.score > 80 && avgSocialBrandingScore > 80) {
        compliancePoints.push({
            category: "Color Palette",
            strength: "The brand's color palette is applied consistently across the website and social channels, creating a cohesive user experience."
        });
    } else if (website.colorPalette?.score < 60 || (social.length > 0 && avgSocialBrandingScore < 60)) {
         compliancePoints.push({
            category: "Color Palette",
            weakness: "Discrepancies in the use of brand colors were observed between the website and social media, which can dilute the brand's visual identity."
        });
    }

    if (website.typography?.score > 75 && avgSocialBrandingScore > 75) {
        compliancePoints.push({
            category: "Typography",
            strength: "Consistent use of fonts and text styles helps maintain a professional and readable brand voice across all digital touchpoints."
        });
    } else if (website.typography?.score < 60 || (social.length > 0 && avgSocialBrandingScore < 60)) {
         compliancePoints.push({
            category: "Typography",
            weakness: "Typography varies between the website and social media content, potentially confusing the brand's voice and weakening its professional appearance."
        });
    }

     const avgSocialContentScore = social.length > 0
        ? social.reduce((acc, s) => acc + (s.contentConsistency?.score || 0), 0) / social.length
        : 0;
    if (website.imagery?.score > 75 && avgSocialContentScore > 75) {
        compliancePoints.push({
            category: "Imagery & Tone",
            strength: "The style of imagery and overall tone is consistent, presenting a unified brand personality on the website and social platforms."
        });
    } else if (website.imagery?.score < 60 || (social.length > 0 && avgSocialContentScore < 60)) {
         compliancePoints.push({
            category: "Imagery & Tone",
            weakness: "The visual tone and style of imagery differ significantly between the website and social media, creating a disjointed brand experience for the audience."
        });
    }

    if (compliancePoints.length === 0) {
        return null;
    }

    return (
        <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="font-bold text-lg text-brand-gray font-display mb-3">Detailed Compliance Checks:</h4>
            <div className="space-y-3">
                {compliancePoints.map(point => (
                    <div key={point.category} className="p-4 bg-gray-50 rounded-lg border border-gray-200 break-inside-avoid">
                        <p className="font-semibold text-brand-gray">{point.category}</p>
                        {point.strength && (
                            <p className="text-sm text-green-800 bg-green-50 p-2 rounded-md flex items-start mt-2">
                                <CheckCircleIcon className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-green-500" />
                                <span><strong className="font-semibold">Strength:</strong> {point.strength}</span>
                            </p>
                        )}
                        {point.weakness && (
                             <p className="text-sm text-white bg-cyan-800 p-2 rounded-md flex items-start mt-2">
                                <ExclamationIcon className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-cyan-300" />
                                <span><strong className="font-semibold">Opportunity:</strong> {point.weakness}</span>
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const ReportView: React.FC<ReportViewProps> = ({ report, onNewAudit }) => {

  if (typeof report.overallScore !== 'number') {
    const isNameMismatch = report.summary?.toLowerCase().includes('business name mismatch');
    const title = isNameMismatch ? `Audit Notice for ${report.businessName}` : 'Error: Incomplete Report';
    const message = report.summary || 'The AI was unable to generate a complete audit report. Please check your inputs and try again.';
    
    const containerClasses = isNameMismatch 
      ? "bg-yellow-50 border border-yellow-200" 
      : "bg-red-50 border border-red-200";
    const titleClasses = isNameMismatch 
      ? "text-yellow-800" 
      : "text-red-800";
    const messageClasses = isNameMismatch
      ? "text-yellow-700"
      : "text-red-700";
      
    const ErrorIcon = () => {
        const iconColor = isNameMismatch ? "text-yellow-500" : "text-red-500";
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        );
    };

    return (
        <div className="animate-fade-in">
            <div className={`rounded-xl shadow-lg mb-10 ${containerClasses}`}>
                <div className="flex flex-col items-center text-center p-8">
                    <ErrorIcon />
                    <h2 className={`mt-4 text-3xl font-bold font-display ${titleClasses}`}>{title}</h2>
                    <p className={`mt-3 text-lg max-w-2xl mx-auto ${messageClasses}`}>{message}</p>
                    <button
                        onClick={onNewAudit}
                        className="mt-8 bg-brand-turquoise text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity shadow-md"
                    >
                        {isNameMismatch ? 'Check Inputs' : 'Try Again'}
                    </button>
                </div>
            </div>
        </div>
    );
  }

  const validRecommendations = report.keyRecommendations?.filter(rec => rec && (rec && (rec.point || rec.rationale)));
  const placeholderImages = report.placeholderImages || {};

  return (
    <>
      <div>
        <div className="animate-fade-in">
            <div className="text-center p-8 bg-gradient-to-br from-white to-cyan-50 rounded-xl shadow-2xl border border-gray-100 mb-10 break-inside-avoid">
                <h2 className="text-4xl font-extrabold text-brand-gray font-display">Brand Audit for <span className="text-brand-turquoise">{report.businessName}</span></h2>
                <div className="mt-6 flex flex-col items-center">
                    <h3 className="text-xl font-bold mb-2 font-display">Overall Score</h3>
                    <ScoreCircle score={report.overallScore} />
                </div>
                <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">{typeof report.summary === 'string' ? report.summary : ''}</p>
            </div>

          <ReportSection title="Key Recommendations" icon={<RecommendationSectionIcon />}>
            <div className="space-y-4">
              {validRecommendations && validRecommendations.length > 0 ? (
                validRecommendations.map((rec, index) => (
                  <RecommendationCard key={index} item={rec} />
                ))
              ) : (
                <p className="text-gray-600 italic">No key recommendations were generated in this audit.</p>
              )}
            </div>
          </ReportSection>

          {report.websiteAnalysis && (
            <ReportSection title="Website Analysis" icon={<GlobeIcon />}>
                <div className="text-right mb-4">
                    <span className="font-bold text-lg">Overall Website Score: </span>
                    <span className="text-2xl font-bold text-brand-turquoise">{report.websiteAnalysis.overallScore}/100</span>
                </div>
                
                {report.trafficInsights && (
                    <div className="mb-6" data-pdf-hideable="true">
                        <TrafficCard data={report.trafficInsights} />
                    </div>
                )}

                {report.techStack && (
                    <div className="mb-6" data-pdf-hideable="true">
                        <TechStackCard data={report.techStack} />
                    </div>
                )}

                <h4 className="text-xl font-bold text-brand-gray mt-6 mb-4 border-b-2 border-cyan-200 pb-2 font-display">Visual Branding</h4>
                <div className="grid md:grid-cols-2 gap-6 print:gap-4">
                    <CriteriaCard title="Logo & Visual Identity" data={report.websiteAnalysis.logo} placeholderImage={placeholderImages.logo} imageType="logo" />
                    <CriteriaCard title="Color Palette" data={report.websiteAnalysis.colorPalette} placeholderImage={placeholderImages.colorPalette} imageType="color palette" />
                    <CriteriaCard title="Imagery & Visuals" data={report.websiteAnalysis.imagery} placeholderImage={placeholderImages.imagery} imageType="imagery" />
                    <CriteriaCard title="Iconography & Visual Elements" data={report.websiteAnalysis.iconography} />
                </div>

                <div data-pdf-hideable="true">
                    <h4 className="text-xl font-bold text-brand-gray mt-8 mb-4 border-b-2 border-cyan-200 pb-2 font-display">SEO & Technical Analysis</h4>
                    <div className="grid md:grid-cols-2 gap-6 print:gap-4">
                        <CriteriaCard title="SEO: Meta Descriptions" data={report.websiteAnalysis.seoMetaDescription} />
                        <CriteriaCard title="SEO: Keyword Usage" data={report.websiteAnalysis.seoKeywords} />
                        <CriteriaCard title="SEO: Mobile Friendliness" data={report.websiteAnalysis.seoMobileFriendly} />
                        <CriteriaCard title="SEO: Schema Markup" data={report.websiteAnalysis.seoSchemaMarkup} />
                        <CriteriaCard title="SEO: Site Speed" data={report.websiteAnalysis.seoSiteSpeed} />
                    </div>
                </div>
            </ReportSection>
          )}

          {report.competitorAnalysis && report.competitorAnalysis.length > 0 && (
              <div data-pdf-hideable="true">
                <ReportSection title="Competitor Comparison" icon={<ChartIcon />}>
                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 print:grid-cols-1">
                        {report.competitorAnalysis.map((comp, index) => (
                            <CompetitorCard key={index} data={comp} />
                        ))}
                    </div>
                </ReportSection>
              </div>
          )}

          {report.socialMediaAnalysis && report.socialMediaAnalysis.length > 0 && (
             <div data-pdf-hideable="true">
                <ReportSection title="Social Media Presence" icon={<UsersIcon />}>
                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 print:grid-cols-1">
                        {report.socialMediaAnalysis.map((social) => (
                            <SocialPlatformCard key={social.platform} data={social} />
                        ))}
                    </div>
                </ReportSection>
             </div>
          )}

          {report.reputationAnalysis && (
             <ReportSection title="Online Reputation Analysis" icon={<ChatBubbleIcon />}>
                 <CriteriaCard title="Customer Reviews & Trust" data={report.reputationAnalysis} />
             </ReportSection>
          )}

          {report.brandComplianceSummary && (
            <ReportSection title="Brand Compliance Summary" icon={<CheckBadgeIcon />}>
                <p className="text-gray-700 leading-relaxed">{typeof report.brandComplianceSummary === 'string' ? report.brandComplianceSummary : ''}</p>
                 {report.websiteAnalysis && report.socialMediaAnalysis && report.socialMediaAnalysis.length > 0 && (
                    <BrandComplianceDetails
                        website={report.websiteAnalysis}
                        social={report.socialMediaAnalysis}
                    />
                )}
            </ReportSection>
          )}

          <CTA />
        </div>
      </div>

       <div className="mt-10 text-center flex flex-col sm:flex-row justify-center items-center gap-4 print-hidden">
            <button
                onClick={onNewAudit}
                className="bg-brand-turquoise text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
            >
                Start New Audit
            </button>
       </div>
    </>
  );
};


// SECTION ICONS
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a4 4 0 110-5.292" /></svg>;
const RecommendationSectionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const CheckBadgeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ChatBubbleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
const LightbulbIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const ChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const CheckCircleIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className || "h-5 w-5"} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
const ExclamationIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className || "h-5 w-5"} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 3.001-1.742 3.001H4.42c-1.53 0-2.493-1.667-1.743-3.001l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;
const SparklesIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;

// SOCIAL MEDIA ICONS
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" /></svg>;
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073 1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" /></svg>;
const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
const LinkedInIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.97v16h4.97v-8.369c0-2.025 1.58-3.637 3.58-3.637s3.42 1.612 3.42 3.637v8.369h4.97v-10c0-6-4-10-9.98-10z" /></svg>;
const TikTokIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>;
const YouTubeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>;
const GoogleBusinessIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" /></svg>;
const GenericLinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true"><path d="M10.59 13.41c.41-.39.41-1.02 0-1.41-.39-.39-1.02-.39-1.41 0l-2.12 2.12c-1.17 1.17-1.17 3.07 0 4.24 1.17 1.17 3.07 1.17 4.24 0l2.12-2.12c.39-.39.39-1.02 0-1.41a.9959.9959 0 00-1.41 0l-1.41 1.41c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41l1.41-1.41zm-2.82-4.24c.39-.39 1.02-.39 1.41 0l2.12 2.12c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0l-2.12-2.12c-.39-.39-.39-1.02 0-1.41zm7.07-2.83c-1.17-1.17-3.07-1.17-4.24 0l-2.12 2.12c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0l2.12-2.12c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-2.12 2.12c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l2.12-2.12c1.17-1.17 1.17-3.07 0-4.24z"/></svg>;

const SocialIcon: React.FC<{ platformName: string }> = ({ platformName }) => {
    const normalizedName = platformName.toLowerCase();
    if (normalizedName.includes('facebook')) return <FacebookIcon />;
    if (normalizedName.includes('instagram')) return <InstagramIcon />;
    if (normalizedName.includes('twitter') || normalizedName.includes(' x')) return <TwitterIcon />;
    if (normalizedName.includes('linkedin')) return <LinkedInIcon />;
    if (normalizedName.includes('tiktok')) return <TikTokIcon />;
    if (normalizedName.includes('youtube')) return <YouTubeIcon />;
    if (normalizedName.includes('google')) return <GoogleBusinessIcon />;
    return <GenericLinkIcon />;
};


export default ReportView;