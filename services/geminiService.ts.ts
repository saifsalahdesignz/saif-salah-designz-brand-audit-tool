

import { GoogleGenAI, Modality } from "@google/genai";
import type { AuditFormData, AuditReport } from '../types';

// Fix: Per coding guidelines, API key must be obtained from process.env.API_KEY.
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `You are an advanced AI brand audit specialist for Saif Salah Designz. You operate as a series of independent analysis modules. Your primary function is to browse the live web, extract specific data points, and populate a JSON structure.

Your analysis must be data-driven, professional, and formatted as a single valid JSON object.

**CRITICAL PROTOCOLS:**
1.  **INDEPENDENT MODULES & ERROR LOGGING:** Treat each primary section of the JSON template (websiteAnalysis, techStack, competitorAnalysis, etc.) as a separate task. If you cannot access a URL or find data for a specific section, fail gracefully *only for that section*.
    - Set the 'score' (if applicable) to 0.
    - Populate the 'analysis' array with one object: { "point": "Data Not Available", "rationale": "[Specific error reason: e.g., 'URL returned 404', 'Blocked by CAPTCHA', 'Timeout']." }
    - DO NOT stop the entire audit. Proceed to the next section.
2.  **MANDATORY LIVE BROWSING:** You MUST attempt to access provided URLs for every single field. Do not provide generic advice.
3.  **BUSINESS NAME VALIDATION:** First, verify the business name on the main URL. If it does not reasonably match, halt and return ONLY: \`{"summary": "Error: Business name mismatch."}\`.
4.  **CONVERSION FRAMING:** In 'rationale' fields, explain the 'why' and its impact, positioning professional expertise as the solution.
5.  **SERVICE HOOKS:** Include brief mentions of Saif Salah Designz's professional services in summaries where relevant.

**NEW MODULES:**
*   **Tech Stack Detection:** Scan the HTML source code of the main URL. Identify visible technologies (CMS like WordPress/Shopify, Analytics tags, JS frameworks like React, marketing tools).
*   **Traffic Insights:** Based on public SEO signals and brand prominence found during browsing, provide an *estimated* range for monthly visits and engagement level. If unavailable, state "Unable to estimate".
*   **Competitor Comparison (If requested):** Visit supplied competitor URLs. Perform a brief comparative analysis against the main business across visible brand/website strengths.
*   **Icon Quality Analysis:** Scan the website for icons (SVGs, icon fonts, image files). Evaluate them based on:
    *   **Format:** Prioritize SVGs for scalability. Score higher for SVGs.
    *   **Resolution:** Check if raster icons (PNG, JPG) are high-resolution and not pixelated.
    *   **Consistency:** Assess if icons share a consistent visual style (e.g., line weight, solid/outline).
    *   **Rendering:** Note any broken or poorly rendered icons.
    *   Provide actionable feedback, like 'Recommend upgrading pixelated PNG icons to SVG format for clarity.'

Your response must be a single JSON block satisfying the schema structure below.`;


const buildPrompt = (formData: AuditFormData): string => {
    const socialLinks = Object.entries(formData.socialMedia)
        .filter(([, url]) => url)
        .map(([platform, url]) => `- ${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${url}`)
        .join('\n');
    
    const reputationData = (formData.customerReputation.reviewsCount && formData.customerReputation.averageRating) 
        ? `- ${formData.customerReputation.reviewsCount} reviews with an average rating of ${formData.customerReputation.averageRating} out of 5.`
        : '- Not provided.';

    const competitorData = formData.competitors && formData.competitors.length > 0
        ? formData.competitors.map(url => `- Competitor URL: ${url}`).join('\n')
        : '- No competitors provided.';
        
    const scanTimestamp = new Date().toISOString();

    return `
**AUDIT TASK:**
Perform a real-time, data-driven brand audit for the following business.

**BUSINESS DETAILS:**
- Business Name: ${formData.businessName}
- Website URL: ${formData.websiteUrl}
- Customer Reputation: ${reputationData}
- Social Media:
${socialLinks || '- None provided'}
- Competitors to compare:
${competitorData}

**EXECUTION PLAN:**
1. Verify business name matches website content.
2. Analyze website branding, iconography, and technical SEO.
3. Detect technology stack on the home page.
4. Estimate traffic insights based on public signals.
5. Analyze social media presence and reputation data (if provided).
6. If competitor URLs are present, visit them and generate brief comparison points.
7. Populate the JSON schema with findings.
8. In "brandComplianceSummary", specifically cite examples of consistency/inconsistency found between website and social channels.

**JSON OUTPUT TEMPLATE:**
\`\`\`json
{
    "businessName": "${formData.businessName}",
    "overallScore": 0,
    "summary": "Audit Scope: ... - Scan Timestamp: ${scanTimestamp}. ...",
    "brandComplianceSummary": "Specific examples of compliance/non-compliance between website elements (logo, font, colors) and social profiles.",
    "keyRecommendations": [
        { "point": "...", "rationale": "..." }
    ],
    "websiteAnalysis": {
        "overallScore": 0,
        "logo": { "score": 0, "analysis": [{ "point": "...", "rationale": "..." }] },
        "colorPalette": { "score": 0, "analysis": [{ "point": "...", "rationale": "..." }] },
        "typography": { "score": 0, "analysis": [{ "point": "...", "rationale": "..." }] },
        "imagery": { "score": 0, "analysis": [{ "point": "...", "rationale": "..." }] },
        "iconography": { "score": 0, "analysis": [{ "point": "...", "rationale": "..." }] },
        "seoMetaDescription": { "score": 0, "analysis": [{ "point": "...", "rationale": "..." }] },
        "seoKeywords": { "score": 0, "analysis": [{ "point": "...", "rationale": "..." }] },
        "seoMobileFriendly": { "score": 0, "analysis": [{ "point": "...", "rationale": "..." }] },
        "seoSchemaMarkup": { "score": 0, "analysis": [{ "point": "...", "rationale": "..." }] },
        "seoSiteSpeed": { "score": 0, "analysis": [{ "point": "...", "rationale": "..." }] }
    },
    "techStack": {
        "toolsDetected": ["Tool 1", "Tool 2"],
        "analysis": [{ "point": "...", "rationale": "..." }]
    },
    "trafficInsights": {
        "estimatedMonthlyVisits": "Range e.g. 1k-5k",
        "engagementLevel": "Low/Medium/High",
        "analysis": [{ "point": "...", "rationale": "..." }]
    },
    "reputationAnalysis": {
        "score": 0,
        "analysis": [{ "point": "...", "rationale": "..." }]
    },
    "socialMediaAnalysis": [
        {
            "platform": "Platform Name",
            "overallScore": 0,
            "profileBranding": { "score": 0, "analysis": [{ "point": "...", "rationale": "..." }] },
            "contentConsistency": { "score": 0, "analysis": [{ "point": "...", "rationale": "..." }] },
            "engagementTactics": { "score": 0, "analysis": [{ "point": "...", "rationale": "..." }] },
            "actionableTips": [{ "point": "...", "rationale": "..." }]
        }
    ],
    "competitorAnalysis": [
        {
            "competitorName": "Competitor 1 Name",
            "competitorUrl": "url1",
            "comparisonPoints": [{ "point": "Comparison Point", "rationale": "How they compare..." }]
        }
    ]
}
\`\`\`
`;
};


export const generateBrandAudit = async (formData: AuditFormData): Promise<AuditReport> => {
    const prompt = buildPrompt(formData);
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                 systemInstruction: SYSTEM_INSTRUCTION,
                 tools: [{googleSearch: {}}],
                 temperature: 0.3,
            },
        });
        
        const rawText = response.text.trim();
        let jsonText = '';

        const markdownRegex = /```(?:json)?\s*(\{[\s\S]*\})\s*```/;
        const markdownMatch = rawText.match(markdownRegex);
        
        if (markdownMatch && markdownMatch[1]) {
            jsonText = markdownMatch[1];
        } else {
            const firstBrace = rawText.indexOf('{');
            if (firstBrace === -1) {
                console.error("No JSON object start found in AI response", rawText);
                throw new Error("The AI returned an invalid response format.");
            }

            let braceCount = 1;
            let inString = false;
            let lastBrace = -1;

            for (let i = firstBrace + 1; i < rawText.length; i++) {
                const char = rawText[i];
                if (char === '"' && (i === 0 || rawText[i-1] !== '\\')) {
                    inString = !inString;
                }
                if (!inString) {
                    if (char === '{') braceCount++;
                    else if (char === '}') braceCount--;
                }
                if (braceCount === 0) {
                    lastBrace = i;
                    break;
                }
            }

            if (lastBrace !== -1) {
                jsonText = rawText.substring(firstBrace, lastBrace + 1);
            } else {
                console.error("Could not find a complete JSON object in AI response", rawText);
                throw new Error("The AI returned an incomplete JSON response.");
            }
        }

        const reportData = JSON.parse(jsonText);

        if (reportData.summary && reportData.summary.toLowerCase().includes('business name mismatch')) {
             return {
                businessName: formData.businessName,
                summary: reportData.summary,
             } as AuditReport;
        }

        reportData.businessName = formData.businessName;

        if (reportData.socialMediaAnalysis) {
            if (!Array.isArray(reportData.socialMediaAnalysis)) {
                reportData.socialMediaAnalysis = [reportData.socialMediaAnalysis];
            }

             reportData.socialMediaAnalysis = reportData.socialMediaAnalysis.filter((platformAudit: any) => {
                if (!platformAudit?.platform) return false;
                const platformKey = platformAudit.platform.toLowerCase()
                    .replace(/\s*\(x\)$/i, '')
                    .replace(/\s+/g, '');
                return Object.keys(formData.socialMedia).find(key => 
                    key.toLowerCase() === platformKey && formData.socialMedia[key as keyof typeof formData.socialMedia]
                );
            });
        }
        
        return reportData as AuditReport;

    } catch (error) {
        console.error("Error calling Gemini API or parsing response:", error);
        if (error instanceof SyntaxError) {
             throw new Error("The AI generated a malformed report that could not be read. Please try again.");
        }
        if (error instanceof Error && error.message) {
            throw new Error(error.message);
        }
        throw new Error("Failed to generate the audit report due to an issue with the AI service. Please try again later.");
    }
};

export const generatePlaceholderImage = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: prompt }],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
        }
        console.error("No image data found in response for prompt:", prompt);
        return ""; // Return empty string on failure to find image data

    } catch (error) {
        console.error("Error generating placeholder image:", error);
        return ""; // Return empty string on API error
    }
};