// export const getPromptBase = (agentName) => {
//   return `Provide detailed information about the AI agent named "${agentName}", focusing on the following aspects separately::1. Target Audience: What is the ideal business size this AI agent is tailored for? Please provide the answer starting with "Target Audience: ".

// 2. Overview: Provide a brief and easy-to-understand description of this AI agent (maximum 150 words). Please provide the answer starting with "Overview: ".

// 3. Industries Served: What are the main industries that this AI agent specializes in or serves? List them clearly, separated by commas. Please provide the answer starting with "Industries Served: ".

// 4. Department Focus: Which business departments does this agent primarily help or automate? For each department, also estimate potential cost savings or efficiency gains. Please format your answer as a list where each item starts with "Department: [Department Name], Potential Savings: [Estimate]". Start the entire answer with "Department Focus:".

// 5. Language Support: Does this AI agent support multiple languages? If yes, specify the number of languages supported and list them if possible, separated by commas. Please provide the answer starting with "Language Support: ".

// 6. Integration Capabilities: What are the native or direct integrations with other tools, platforms, or services? Please detail any important integration points and how they function. Start your answer with "Integration Capabilities: ".

// 7. Compliance & Security: What compliance standards does this AI agent adhere to (e.g., GDPR, HIPAA)? Describe the security measures in place to protect user and business data. Please provide the answer starting with "Compliance & Security: ".

// 8. Customer Support: What types of customer support are available for this AI agent? (e.g., Email, Live Chat, Phone support). If available, please provide contact details or links to support resources. Start your answer with "Customer Support: ".

// 9. Free Trial Availability: Does the platform offering this AI agent have a free trial? If so, please explain the trial details, including duration and features included. Start your answer with "Free Trial Availability: ".

// 10. Key Features: List the core features and capabilities of this AI agent using easy-to-understand industry terms and focusing on the benefits they provide. Please provide each feature as a bullet point under the heading "Key Features:".

// 12. Use Cases: Identify specific and practical use cases where this AI agent is most effective. Provide examples of how it is used in real-world scenarios (e.g., customer service, lead generation, process automation). Start your answer with "Use Cases: ".

// 13. Demo: If a demo video showcasing this AI agent in action is available, please provide a direct link to it. Focus on demonstrations of the agent’s functionality. Please provide the answer starting with "Demo Link: ".

// 14. Documentation & Resources: Please provide direct links to user guides, technical documentation, FAQs, and any other relevant resources available to customers. Start your answer with "Documentation & Resources: ".

// 15. Pricing Structure: Outline the pricing model for this AI agent. If public pricing is not available, explain the subscription models, tiers, and how pricing is generally structured (e.g., per user, per transaction, tiered based on features). Start your answer with "Pricing Structure: ".

// 16. Autonomy Level: Is this AI agent fully autonomous (operates independently) or does it function as a co-pilot, assisting human users in their tasks? Please provide the answer starting with "Autonomy Level: ".

// 17. Category Tags: Provide relevant industry and technology tags that categorize this AI agent (e.g., AI, NLP, Automation, Voice Assistance, CRM), separated by commas. Please provide the answer starting with "Category Tags: ".`;
// };


export const getPromptBase = (agentName) => {
  return `Provide detailed information about the AI agent named "${agentName}", focusing on the following aspects separately:

1. Target Audience: What is the ideal business size this AI agent is tailored for? Please provide the answer starting with "Target Audience: ".
2. Overview: Provide a brief and easy-to-understand description of this AI agent (maximum 150 words). Please provide the answer starting with "Overview: ".
3. Industries Served: What are the main industries that this AI agent specializes in or serves? List them clearly, separated by commas. Please provide the answer starting with "Industries Served: ".
4. Department Focus: Which business departments does this agent primarily help or automate? For each department, also estimate potential cost savings or efficiency gains. Please format your answer as a list where each item starts with "Department: [Department Name], Potential Savings: [Estimate]". Start the entire answer with "Department Focus:".
5. Language Support: Does this AI agent support multiple languages? If yes, specify the number of languages supported and list them if possible, separated by commas. Please provide the answer starting with "Language Support: ".
6. Integration Capabilities: What are the native or direct integrations with other tools, platforms, or services? Please detail any important integration points and how they function. Start your answer with "Integration Capabilities: ".
7. Compliance & Security: What compliance standards does this AI agent adhere to (e.g., GDPR, HIPAA)? Describe the security measures in place to protect user and business data. Please provide the answer starting with "Compliance & Security: ".
8. Customer Support: What types of customer support are available for this AI agent? (e.g., Email, Live Chat, Phone support). If available, please provide contact details or links to support resources. Start your answer with "Customer Support: ".
9. Free Trial Availability: Does the platform offering this AI agent have a free trial? If so, please explain the trial details, including duration and features included. Start your answer with "Free Trial Availability: ".
10. Key Features: List the core features and capabilities of this AI agent using easy-to-understand industry terms and focusing on the benefits they provide. Please provide each feature as a bullet point under the heading "Key Features:".
12. Use Cases: Identify specific and practical use cases where this AI agent is most effective. Provide examples of how it is used in real-world scenarios (e.g., customer service, lead generation, process automation). Start your answer with "Use Cases: ".
13. Demo: If a demo video showcasing this AI agent in action is available, please provide a direct link to it. Focus on demonstrations of the agent’s functionality. Please provide the answer starting with "Demo Link: ".
14. Documentation & Resources: Please provide direct links to user guides, technical documentation, FAQs, and any other relevant resources available to customers. Start your answer with "Documentation & Resources: ".
15. Pricing Structure: Outline the pricing model for this AI agent. If public pricing is not available, explain the subscription models, tiers, and how pricing is generally structured (e.g., per user, per transaction, tiered based on features). Start your answer with "Pricing Structure: ".
16. Autonomy Level: Is this AI agent fully autonomous (operates independently) or does it function as a co-pilot, assisting human users in their tasks? Please provide the answer starting with "Autonomy Level: ".
17. Category Tags: Provide relevant industry and technology tags that categorize this AI agent (e.g., AI, NLP, Automation, Voice Assistance, CRM), separated by commas. Please provide the answer starting with "Category Tags: ".`;
};

export const getPromptBaseV2 = (agentName, website) => {
  return `You are a software AI Agent analyst. Given the name of a AI agent, your job is to extract and return comprehensive information in the following structured JSON format.

Please fill out all applicable fields. If any field is unknown, use null or an empty array where appropriate. Do not invent values. Do not omit fields.

Agent Name: ${agentName}
Agent Website: ${website}

Return the output in the following JSON structure:

{
  "name": "",
  "slug": "",
  "website": "",
  "repository": "",
  "tagline": "",
  "description": "",
  "content": "",
  "technicalSpecifications": "",
  "useCases": [],
  "category": "",
  "price": "",
  "cost": 0,
  "features": "",
  "keyFeatures": [],
  "submitterNote": "",
  "hostingUrl": "",
  "x": "",
  "linkedIn": "",
  "benefits": "",
  "idealFor": [],
  "integrations": [],
  "languages": [],
  "support": "",
  "functions": [],
  "deals": "",
  "industry": [],
  "freeTrial": "",
  "isPopular": false,
  "customerStories": "",
  "openSourceInfo": "",
  "discountCode": "",
  "form": "",
  "discountAmount": "",
  "firstCommitDate": null,
  "lastCommitDate": null,
  "status": "Draft",
  "publishedAt": null,
  "createdAt": null,
  "updatedAt": null
}`;
};



// Static keys for storage in the DB
const staticKeys = [
  "target_audience",
  "overview",
  "industries_served",
  "department_focus",
  "language_support",
  "integration_capabilities",
  "compliance_security",
  "customer_support",
  "free_trial_availability",
  "key_features",
  "use_cases",
  "demo_link",
  "documentation_resources",
  "pricing_structure",
  "autonomy_level",
  "category_tags",
];

// Example of a structure to store the response
const agentResponse = {
  target_audience: "Small to medium-sized businesses",
  overview: "An AI agent that helps businesses automate customer service tasks.",
  industries_served: "Retail, Healthcare, Finance",
  department_focus: [
    { department: "Customer Service", potential_savings: "$10,000/year" },
    { department: "HR", potential_savings: "$5,000/year" },
  ],
  language_support: "5 languages: English, Spanish, French, German, Italian",
  integration_capabilities: "Slack, Microsoft Teams, Salesforce",
  compliance_security: "GDPR, HIPAA compliant with AES-256 encryption",
  customer_support: "Email, Live Chat, Phone support available 24/7",
  free_trial_availability: "14-day free trial with full features",
  key_features: ["Automated customer response", "Real-time data analysis", "Sentiment analysis"],
  use_cases: ["Customer service automation", "Lead generation", "Process automation"],
  demo_link: "https://example.com/demo",
  documentation_resources: "https://example.com/docs",
  pricing_structure: "Tiered pricing: $50/month, $100/month for advanced features",
  autonomy_level: "Co-pilot",
  category_tags: "AI, Automation, NLP, Customer Service",
};


export function parseAgentDetails(rawText) {
  // Initialize an object to hold all the parsed details
  const agentDetails = {
    targetAudience: '',
    overview: '',
    industriesServed: '',
    departmentFocus: [],
    languageSupport: [],
    integrationCapabilities: [],
    complianceAndSecurity: {},
    customerSupport: {},
    freeTrialAvailability: '',
    keyFeatures: [],
    useCases: [],
    demoLink: '',
    documentationResources: {},
    pricingStructure: {},
    autonomyLevel: '',
    categoryTags: []
  };

  const sectionRegex = /\*\*(\d+)\.\s+(.+?):\*\*\s+([\s\S]*?)(?=\*\*\d+\.|$)/g;
  let match;
  
  // Process each section of the raw text
  while ((match = sectionRegex.exec(rawText)) !== null) {
    const index = match[1].trim();  // Section number (e.g., "1")
    const title = match[2].trim();  // Section title (e.g., "Target Audience")
    const content = match[3].trim();  // Section content

    // Assign content to specific variables based on section title
    switch (title.toLowerCase()) {
      case 'target audience':
        agentDetails.targetAudience = content;
        break;
      case 'overview':
        agentDetails.overview = content;
        break;
      case 'industries served':
        agentDetails.industriesServed = content;
        break;
      case 'department focus':
        // Handle multi-line department focus content
        agentDetails.departmentFocus.push(content);
        break;
      case 'language support':
        agentDetails.languageSupport = content.split(',').map(lang => lang.trim());
        break;
      case 'integration capabilities':
        agentDetails.integrationCapabilities = content.split(',').map(integration => integration.trim());
        break;
      case 'compliance & security':
        // Store compliance & security details as an object
        agentDetails.complianceAndSecurity = parseComplianceSecurity(content);
        break;
      case 'customer support':
        agentDetails.customerSupport = parseCustomerSupport(content);
        break;
      case 'free trial availability':
        agentDetails.freeTrialAvailability = content;
        break;
      case 'key features':
        agentDetails.keyFeatures = content.split(',').map(feature => feature.trim());
        break;
      case 'use cases':
        agentDetails.useCases = content.split(',').map(useCase => useCase.trim());
        break;
      case 'demo link':
        agentDetails.demoLink = content;
        break;
      case 'documentation & resources':
        agentDetails.documentationResources = parseDocumentationResources(content);
        break;
      case 'pricing structure':
        agentDetails.pricingStructure = parsePricingStructure(content);
        break;
      case 'autonomy level':
        agentDetails.autonomyLevel = content;
        break;
      case 'category tags':
        agentDetails.categoryTags = content.split(',').map(tag => tag.trim());
        break;
      default:
        console.log(`Unrecognized section: ${title}`);
    }
  }

  return agentDetails;
}

// Helper functions for parsing specific sections:
function parseComplianceSecurity(content) {
  // Parse content for compliance and security details
  const details = {};
  const lines = content.split('\n');
  lines.forEach(line => {
    if (line.includes('Data encryption')) {
      details.encryption = line.trim();
    } else if (line.includes('Security audits')) {
      details.securityAudits = line.trim();
    } else if (line.includes('Role-based access control')) {
      details.roleBasedAccess = line.trim();
    } else if (line.includes('Multi-factor authentication')) {
      details.multiFactorAuthentication = line.trim();
    } else if (line.includes('Data residency options')) {
      details.dataResidency = line.trim();
    }
  });
  return details;
}

function parseCustomerSupport(content) {
  // Parse customer support section into an object
  const support = {};
  const lines = content.split('\n');
  lines.forEach(line => {
    if (line.includes('Email:')) {
      support.email = line.trim();
    } else if (line.includes('Live Chat:')) {
      support.liveChat = line.trim();
    } else if (line.includes('Knowledge Base:')) {
      support.knowledgeBase = line.trim();
    } else if (line.includes('Phone Support:')) {
      support.phoneSupport = line.trim();
    }
  });
  return support;
}

function parseDocumentationResources(content) {
  // Parse documentation and resources into an object
  const resources = {};
  const lines = content.split('\n');
  lines.forEach(line => {
    if (line.includes('User Guide:')) {
      resources.userGuide = line.trim();
    } else if (line.includes('API Documentation:')) {
      resources.apiDocumentation = line.trim();
    } else if (line.includes('FAQ:')) {
      resources.faq = line.trim();
    } else if (line.includes('Blog:')) {
      resources.blog = line.trim();
    }
  });
  return resources;
}

function parsePricingStructure(content) {
  // Parse pricing structure into an object
  const pricing = {};
  const lines = content.split('\n');
  lines.forEach(line => {
    if (line.includes('Basic Plan')) {
      pricing.basicPlan = line.trim();
    } else if (line.includes('Pro Plan')) {
      pricing.proPlan = line.trim();
    } else if (line.includes('Enterprise Plan')) {
      pricing.enterprisePlan = line.trim();
    } else if (line.includes('Custom pricing')) {
      pricing.customPricing = line.trim();
    }
  });
  return pricing;
}
