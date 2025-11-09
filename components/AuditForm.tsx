import React, { useState } from 'react';
import type { AuditFormData, SocialLinks, CustomerReputation } from '../types';
import { SOCIAL_PLATFORMS } from '../constants';

interface AuditFormProps {
  onAuditRequest: (formData: AuditFormData) => void;
}

// Moved InputField outside the AuditForm component to prevent re-creation on each render
const InputField: React.FC<{name: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string, error?: string, type?: string}> = ({name, label, value, onChange, placeholder, error, type = 'text'}) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-brand-gray mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border ${error ? 'border-brand-turquoise' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-turquoise focus:border-transparent transition`}
      />
      {error && <p className="mt-1 text-xs text-brand-turquoise">{error}</p>}
    </div>
  );


const AuditForm: React.FC<AuditFormProps> = ({ onAuditRequest }) => {
  const [formData, setFormData] = useState<AuditFormData>({
    businessName: '',
    contactEmail: '',
    websiteUrl: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      tiktok: '',
      youtube: '',
      googleBusiness: '',
    },
    customerReputation: {
        reviewsCount: '',
        averageRating: '',
    },
    competitors: ['', ''],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.businessName) newErrors.businessName = 'Business name is required.';
    if (!formData.websiteUrl) {
      newErrors.websiteUrl = 'Website URL is required.';
    } else if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData.websiteUrl)) {
      newErrors.websiteUrl = 'Please enter a valid URL.';
    }
    if (!formData.contactEmail) {
      newErrors.contactEmail = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Filter out empty competitor strings before sending
      const filteredCompetitors = formData.competitors.filter(url => url.trim() !== '');
      onAuditRequest({
          ...formData,
          competitors: filteredCompetitors
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReputationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      customerReputation: { ...prev.customerReputation, [name as keyof CustomerReputation]: value },
    }));
  };
  
  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [name as keyof SocialLinks]: value },
    }));
  };

  const handleCompetitorChange = (index: number, value: string) => {
    const updatedCompetitors = [...formData.competitors];
    updatedCompetitors[index] = value;
    setFormData(prev => ({ ...prev, competitors: updatedCompetitors }));
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-brand-gray font-display">Get Your Free Brand Audit</h2>
        <p className="mt-2 text-gray-600">Enter your business details to receive an AI-powered analysis of your digital presence.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField name="businessName" label="Business Name" value={formData.businessName} onChange={handleInputChange} placeholder="e.g., Creative Solutions Inc." error={errors.businessName}/>
            <InputField name="contactEmail" label="Contact Email" value={formData.contactEmail} onChange={handleInputChange} placeholder="you@company.com" error={errors.contactEmail} type="email"/>
        </div>
        <InputField name="websiteUrl" label="Website URL" value={formData.websiteUrl} onChange={handleInputChange} placeholder="https://www.yourwebsite.com" error={errors.websiteUrl}/>
        
        <div>
          <h3 className="text-lg font-medium text-brand-gray mb-2 font-display">Customer Reputation (Optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField name="reviewsCount" label="Number of Online Reviews" value={formData.customerReputation.reviewsCount} onChange={handleReputationChange} placeholder="e.g., 2900" type="number"/>
            <InputField name="averageRating" label="Average Rating (out of 5)" value={formData.customerReputation.averageRating} onChange={handleReputationChange} placeholder="e.g., 4.9" type="number"/>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-brand-gray mb-2 font-display">Social Media Links (Optional)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SOCIAL_PLATFORMS.map(({ key, name, placeholder }) => (
                <div key={key}>
                    <label htmlFor={key} className="block text-sm font-medium text-gray-700 sr-only">{name}</label>
                    <input 
                      type="text" 
                      id={key}
                      name={key}
                      value={formData.socialMedia[key as keyof SocialLinks]}
                      onChange={handleSocialChange}
                      placeholder={placeholder}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-turquoise focus:border-transparent transition"
                    />
                </div>
            ))}
          </div>
        </div>

        <div>
            <h3 className="text-lg font-medium text-brand-gray mb-2 font-display">Competitor Comparison (Optional, Max 2)</h3>
            <p className="text-sm text-gray-500 mb-2">Provide URLs to compare against your competitors.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                    type="text"
                    placeholder="https://competitor1.com"
                    value={formData.competitors[0]}
                    onChange={(e) => handleCompetitorChange(0, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-turquoise focus:border-transparent transition"
                />
                <input
                    type="text"
                    placeholder="https://competitor2.com"
                    value={formData.competitors[1]}
                    onChange={(e) => handleCompetitorChange(1, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-turquoise focus:border-transparent transition"
                />
            </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-brand-turquoise text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-300"
          >
            Generate My Free Audit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuditForm;
