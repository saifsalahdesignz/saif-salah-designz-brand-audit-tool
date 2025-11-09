import React, { useState, useCallback } from 'react';
import { AuditFormData, AuditReport, PlaceholderImages } from './types.ts';
import { generateBrandAudit, generatePlaceholderImage } from './services/geminiService.ts';
import Header from './components/Header.tsx';
import AuditForm from './components/AuditForm.tsx';
import Loader from './components/Loader.tsx';
import ReportView from './components/ReportView.tsx';
import Guide from './components/Guide.tsx';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState<boolean>(true);

  const handleAuditRequest = useCallback(async (formData: AuditFormData) => {
    setIsLoading(true);
    setError(null);
    setReport(null);
    setShowGuide(false);
    try {
      const generatedReport = await generateBrandAudit(formData);
      setReport(generatedReport);

      // Asynchronously generate placeholder images for low-scoring areas
      // without blocking the main report from displaying.
      if (generatedReport.websiteAnalysis) {
        const { logo, colorPalette, imagery } = generatedReport.websiteAnalysis;

        const updateImageState = (type: keyof PlaceholderImages, url: string) => {
            setReport(prev => {
                if (!prev) return null;
                return { 
                    ...prev, 
                    placeholderImages: { 
                        ...(prev.placeholderImages || {}), 
                        [type]: url 
                    } 
                };
            });
        };
        
        const startImageGeneration = (type: keyof PlaceholderImages) => {
            setReport(prev => {
                if (!prev) return null;
                return { 
                    ...prev, 
                    placeholderImages: { 
                        ...(prev.placeholderImages || {}), 
                        [type]: 'loading' 
                    } 
                };
            });
        };

        if (logo && logo.score < 70) {
            startImageGeneration('logo');
            const prompt = `Generate a concept for a modern, clean, and professional logo for a business named "${generatedReport.businessName}". The logo should be simple, memorable, and suitable for a digital brand. Use a minimalist style with abstract geometric shapes. Display it on a plain white background.`;
            generatePlaceholderImage(prompt).then(url => updateImageState('logo', url));
        }
        if (colorPalette && colorPalette.score < 70) {
            startImageGeneration('colorPalette');
            const prompt = `Create an image displaying a modern and professional color palette for a brand named "${generatedReport.businessName}". The palette should consist of 5 complementary colors, including a primary, secondary, and accent colors. Show the colors as large swatches with their HEX codes clearly labeled below each swatch. The overall feel should be trustworthy and innovative.`;
            generatePlaceholderImage(prompt).then(url => updateImageState('colorPalette', url));
        }
        if (imagery && imagery.score < 70) {
            startImageGeneration('imagery');
            const prompt = `Generate a high-quality, professional stock photo that could be used on the website for "${generatedReport.businessName}". The image should be abstract and conceptual, representing themes of innovation, solutions, and digital technology. It should have a clean, bright, and optimistic aesthetic.`;
            generatePlaceholderImage(prompt).then(url => updateImageState('imagery', url));
        }
      }
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while generating the audit. Please check your inputs or try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleNewAudit = () => {
    setReport(null);
    setError(null);
    setShowGuide(true);
  };

  const handleStartAudit = () => {
    setShowGuide(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-brand-gray font-sans antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="text-center p-8 bg-red-50 border border-red-200 text-red-700 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-red-800 mb-4 font-display">Oops! Something Went Wrong</h2>
              <p>{error}</p>
              <button
                onClick={handleNewAudit}
                className="mt-6 bg-brand-turquoise text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
              >
                Start Over
              </button>
            </div>
          ) : report ? (
            <ReportView report={report} onNewAudit={handleNewAudit} />
          ) : showGuide ? (
            <Guide onStartAudit={handleStartAudit} />
          ) : (
            <AuditForm onAuditRequest={handleAuditRequest} />
          )}
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Saif Salah Designz. All rights reserved.</p>
      </footer>
    </div>
  );
};
