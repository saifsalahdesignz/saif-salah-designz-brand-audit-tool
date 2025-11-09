export interface SocialLinks {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  tiktok: string;
  youtube: string;
  googleBusiness: string;
}

export interface CustomerReputation {
    reviewsCount: string;
    averageRating: string;
}

export interface AuditFormData {
  businessName: string;
  contactEmail: string;
  websiteUrl: string;
  socialMedia: SocialLinks;
  customerReputation: CustomerReputation;
  competitors: string[];
}

// Sub-types for a more granular report
export interface AnalysisItem {
  point: string;
  rationale: string;
}

export interface CriteriaAudit {
  score: number;
  analysis: AnalysisItem[];
}

export interface WebsiteAudit {
  overallScore: number;
  logo: CriteriaAudit;
  colorPalette: CriteriaAudit;
  typography: CriteriaAudit;
  imagery: CriteriaAudit;
  iconography: CriteriaAudit;
  seoMetaDescription: CriteriaAudit;
  seoKeywords: CriteriaAudit;
  seoMobileFriendly: CriteriaAudit;
  seoSchemaMarkup: CriteriaAudit;
  seoSiteSpeed: CriteriaAudit;
}

export interface SocialMediaPlatformAudit {
  platform: string;
  overallScore: number;
  profileBranding: CriteriaAudit;
  contentConsistency: CriteriaAudit;
  engagementTactics: CriteriaAudit;
  actionableTips: AnalysisItem[];
}

export interface TechStackAudit {
    toolsDetected: string[];
    analysis: AnalysisItem[];
}

export interface TrafficInsightsAudit {
    estimatedMonthlyVisits: string;
    engagementLevel: string;
    analysis: AnalysisItem[];
}

export interface CompetitorComparison {
    competitorName: string;
    competitorUrl: string;
    comparisonPoints: AnalysisItem[];
}

export interface PlaceholderImages {
    logo?: string;
    colorPalette?: string;
    imagery?: string;
}

export interface AuditReport {
  businessName: string;
  overallScore: number;
  summary: string;
  brandComplianceSummary: string;
  websiteAnalysis: WebsiteAudit;
  reputationAnalysis: CriteriaAudit;
  socialMediaAnalysis: SocialMediaPlatformAudit[];
  keyRecommendations: AnalysisItem[];
  techStack?: TechStackAudit;
  trafficInsights?: TrafficInsightsAudit;
  competitorAnalysis?: CompetitorComparison[];
  placeholderImages?: PlaceholderImages;
}