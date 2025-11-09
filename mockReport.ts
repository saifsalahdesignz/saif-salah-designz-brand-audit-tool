import { AuditReport } from './types';

export const mockReportData: AuditReport = {
  businessName: "Creative Solutions Inc.",
  overallScore: 78,
  summary: "Creative Solutions Inc. has a strong digital foundation with a professional website and consistent branding. Key opportunities for growth lie in improving technical SEO, enhancing social media engagement, and actively managing online reputation to build greater trust and authority in the market.",
  brandComplianceSummary: "The brand identity is generally consistent across the website and social media profiles, with consistent use of the logo and primary brand colors. However, typography and imagery style vary slightly between platforms, presenting an opportunity for tighter alignment to strengthen brand recognition.",
  keyRecommendations: [
    {
      point: "Implement a Comprehensive SEO Strategy",
      rationale: "Focus on optimizing meta descriptions and implementing schema markup to improve search engine visibility and click-through rates. This is a core service of Saif Salah Designz that can directly impact lead generation."
    },
    {
      point: "Enhance Social Media Engagement",
      rationale: "Develop an interactive content calendar that encourages audience participation through questions, polls, and user-generated content. Consistent, two-way communication builds a loyal community."
    },
    {
      point: "Launch a Proactive Reputation Management Campaign",
      rationale: "Actively solicit reviews from satisfied customers and respond to all new reviews (both positive and negative) to show that the business values customer feedback and is committed to service excellence."
    },
    {
      point: "Optimize Website Load Speed",
      rationale: "Compress images and leverage browser caching to improve page load times. A faster website provides a better user experience and is a positive ranking signal for Google."
    }
  ],
  websiteAnalysis: {
    overallScore: 82,
    logo: {
      score: 90,
      analysis: [
        {
          point: "Logo is simple, memorable, and scalable.",
          rationale: "The clean, geometric design works well across various sizes, from a small favicon to larger print materials, ensuring consistent brand recognition."
        }
      ]
    },
    colorPalette: {
      score: 85,
      analysis: [
        {
          point: "The color scheme is professional and aligns with the brand's identity.",
          rationale: "The use of blue inspires trust and reliability, which is appropriate for a solutions-oriented business. Contrast is generally good for accessibility."
        }
      ]
    },
    typography: {
      score: 75,
      analysis: [
        {
          point: "Readability is good, but hierarchy could be stronger.",
          rationale: "The body text is clear, but differentiating between H2 and H3 headings is difficult. A more distinct typographic scale would improve scannability for users."
        }
      ]
    },
    imagery: {
      score: 70,
      analysis: [
        {
          point: "High-quality stock imagery is used.",
          rationale: "While professional, the images lack authenticity. Using photos of the actual team and projects would build significantly more trust and connection with the audience."
        }
      ]
    },
    iconography: {
      score: 72,
      analysis: [
        {
          point: "Icons are stylistically consistent (outline style).",
          rationale: "Using a single, consistent icon style creates a professional and cohesive user interface. This is well-executed."
        },
        {
          point: "Some icons are low-resolution PNGs.",
          rationale: "The social media icons in the footer are slightly pixelated on high-resolution displays. Converting them to SVG format would ensure they are sharp at any size."
        }
      ]
    },
    seoMetaDescription: {
        score: 60,
        analysis: [
            {
                point: "Descriptions are too long on key service pages.",
                rationale: "Google truncates meta descriptions after about 155-160 characters. Overly long descriptions get cut off, hiding key information and weakening the message."
            },
            {
                point: "Call-to-Action (CTA) is often missing.",
                rationale: "The meta description is a direct sales pitch in search results. A compelling CTA like 'Get a Free Quote' or 'Learn More' encourages users to click."
            },
            {
                point: "Primary keywords are not consistently included.",
                rationale: "Including target keywords in the meta description helps signal relevance to both users and search engines, which can improve click-through rate."
            }
        ]
    },
    seoKeywords: {
        score: 65,
        analysis: [
            {
                point: "H1/H2 Targeting: Primary keywords are present but lack strategic variation.",
                rationale: "Using the main keyword in the H1 is good practice, but subheadings should target long-tail variations and related questions to build topical authority and capture a wider audience."
            },
            {
                point: "Keyword Density: Density is within an acceptable range, avoiding 'keyword stuffing'.",
                rationale: "The content reads naturally and avoids over-optimization, which is crucial for user experience and preventing search engine penalties."
            },
            {
                point: "Natural Language Integration: Keywords in body content feel slightly forced in some service descriptions.",
                rationale: "To improve, prioritize writing for the user first. Keywords should be integrated where they make contextual sense, not just to meet a quota. This enhances readability and user engagement."
            }
        ]
    },
    seoMobileFriendly: {
        score: 90,
        analysis: [
            {
                point: "The website is fully responsive and easy to use on mobile devices.",
                rationale: "A mobile-first design ensures a positive user experience for the majority of web traffic and is a critical factor for SEO."
            }
        ]
    },
    seoSchemaMarkup: {
        score: 40,
        analysis: [
            {
                point: "Schema markup for the organization is missing.",
                rationale: "Without schema, you miss the opportunity for rich snippets (like star ratings or FAQs) in search results, which can significantly improve visibility and click-through rates."
            }
        ]
    },
    seoSiteSpeed: {
        score: 68,
        analysis: [
            {
                point: "Perceived site speed is average.",
                rationale: "Large, unoptimized images appear to be slowing down page load times. Compressing images would provide a noticeable boost in performance and reduce bounce rates."
            }
        ]
    }
  },
  reputationAnalysis: {
    score: 75,
    analysis: [
      {
        point: "Positive online reputation with a 4.6-star average rating.",
        rationale: "A strong rating builds trust, but the low volume of reviews (25) suggests that reputation management is not a proactive part of the marketing strategy."
      }
    ]
  },
  socialMediaAnalysis: [
    {
      platform: "Facebook",
      overallScore: 72,
      profileBranding: {
        score: 85,
        analysis: [
          {
            point: "Profile and cover photos are on-brand.",
            rationale: "Consistent visual identity with the website reinforces brand recognition."
          }
        ]
      },
      contentConsistency: {
        score: 60,
        analysis: [
          {
            point: "Posting frequency is inconsistent.",
            rationale: "Several weeks can pass between posts, which can lead to a decline in audience engagement and reach."
          }
        ]
      },
      engagementTactics: {
        score: 70,
        analysis: [
          {
            point: "Responds to comments, but does not initiate conversations.",
            rationale: "Engagement is reactive. Proactively asking questions and running polls would foster a stronger community."
          }
        ]
      },
      actionableTips: [
        {
          point: "Post a client success story once a week.",
          rationale: "Showcasing results provides social proof and demonstrates the value of your services."
        },
        {
            point: "Use Facebook Live for a Q&A session.",
            rationale: "Live video is highly engaging and allows for direct interaction with your audience, building trust and authority."
        }
      ]
    },
    {
        platform: "LinkedIn",
        overallScore: 80,
        profileBranding: {
          score: 90,
          analysis: [
            {
              point: "Company page is fully filled out and professional.",
              rationale: "A complete profile with a clear mission statement and employee information presents a strong professional image."
            }
          ]
        },
        contentConsistency: {
          score: 75,
          analysis: [
            {
              point: "Content is relevant but infrequent.",
              rationale: "Posts about company news and industry insights are valuable, but a more consistent schedule (2-3 times per week) would improve visibility."
            }
          ]
        },
        engagementTactics: {
          score: 75,
          analysis: [
            {
              point: "Engages with industry-related content.",
              rationale: "Commenting on and sharing posts from other industry leaders is a good tactic for increasing visibility and network growth."
            }
          ]
        },
        actionableTips: [
          {
            point: "Share in-depth articles or case studies.",
            rationale: "LinkedIn is the ideal platform for showcasing expertise and thought leadership through long-form content."
          },
          {
              point: "Encourage employees to share company posts.",
              rationale: "Employee advocacy can dramatically increase the reach of your content to new, relevant networks."
          }
        ]
      }
  ]
};