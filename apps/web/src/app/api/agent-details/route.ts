// // export default async function handler(
// //   req: { method: string; body: { agentName: any } },
// //   res: {
// //     status: (arg0: number) => {
// //       (): any;
// //       new (): any;
// //       json: {
// //         (arg0: { error?: string; base?: any; techStack?: any }): any;
// //         new (): any;
// //       };
// //       end: { (arg0: string): void; new (): any };
// //     };
// //     setHeader: (arg0: string, arg1: string[]) => void;
// //   }
// // ) {
// //   if (req.method === "POST") {
// //     const { agentName } = req.body; // Assuming you'll send the agent name from your frontend

// //     if (!agentName) {
// //       return res.status(400).json({ error: "Agent name is required" });
// //     }

// //     const promptBase = `Provide detailed information about the AI agent named "${agentName}", focusing on the following aspects separately::1. Target Audience: What is the ideal business size this AI agent is tailored for? Please provide the answer starting with "Target Audience: ".

// // 2. Overview: Provide a brief and easy-to-understand description of this AI agent (maximum 150 words). Please provide the answer starting with "Overview: ".

// // 3. Industries Served: What are the main industries that this AI agent specializes in or serves? List them clearly, separated by commas. Please provide the answer starting with "Industries Served: ".

// // 4. Department Focus: Which business departments does this agent primarily help or automate? For each department, also estimate potential cost savings or efficiency gains. Please format your answer as a list where each item starts with "Department: [Department Name], Potential Savings: [Estimate]". Start the entire answer with "Department Focus:".

// // 5. Language Support: Does this AI agent support multiple languages? If yes, specify the number of languages supported and list them if possible, separated by commas. Please provide the answer starting with "Language Support: ".

// // 6. Integration Capabilities: What are the native or direct integrations with other tools, platforms, or services? Please detail any important integration points and how they function. Start your answer with "Integration Capabilities: ".

// // 7. Compliance & Security: What compliance standards does this AI agent adhere to (e.g., GDPR, HIPAA)? Describe the security measures in place to protect user and business data. Please provide the answer starting with "Compliance & Security: ".

// // 8. Customer Support: What types of customer support are available for this AI agent? (e.g., Email, Live Chat, Phone support). If available, please provide contact details or links to support resources. Start your answer with "Customer Support: ".

// // 9. Free Trial Availability: Does the platform offering this AI agent have a free trial? If so, please explain the trial details, including duration and features included. Start your answer with "Free Trial Availability: ".

// // 10. Key Features: List the core features and capabilities of this AI agent using easy-to-understand industry terms and focusing on the benefits they provide. Please provide each feature as a bullet point under the heading "Key Features:".

// // 12. Use Cases: Identify specific and practical use cases where this AI agent is most effective. Provide examples of how it is used in real-world scenarios (e.g., customer service, lead generation, process automation). Start your answer with "Use Cases: ".

// // 13. Demo: If a demo video showcasing this AI agent in action is available, please provide a direct link to it. Focus on demonstrations of the agent’s functionality. Please provide the answer starting with "Demo Link: ".

// // 14. Documentation & Resources: Please provide direct links to user guides, technical documentation, FAQs, and any other relevant resources available to customers. Start your answer with "Documentation & Resources: ".

// // 15. Pricing Structure: Outline the pricing model for this AI agent. If public pricing is not available, explain the subscription models, tiers, and how pricing is generally structured (e.g., per user, per transaction, tiered based on features). Start your answer with "Pricing Structure: ".

// // 16. Autonomy Level: Is this AI agent fully autonomous (operates independently) or does it function as a co-pilot, assisting human users in their tasks? Please provide the answer starting with "Autonomy Level: ".

// // 17. Category Tags: Provide relevant industry and technology tags that categorize this AI agent (e.g., AI, NLP, Automation, Voice Assistance, CRM), separated by commas. Please provide the answer starting with "Category Tags: ".`;
// //     const promptTechStack = `Detail the technical stack used to build the AI agent named "${agentName}", specifically addressing the following components separately: * Speech Recognition: What technologies or software are used for speech recognition? Please provide the answer starting with "Speech Recognition: ".
// // * NLP (Natural Language Processing): What NLP libraries, frameworks, or models are employed? Please provide the answer starting with "NLP: ".
// // * Text-to-Speech (TTS): What technologies or software are used for text-to-speech functionality? Please provide the answer starting with "Text-to-Speech: ".
// // * Backend Infrastructure: Describe the main components and technologies used for the backend infrastructure (e.g., cloud providers, server technologies, programming languages). Please provide the answer starting with "Backend Infrastructure: ".
// // * Voice Interaction Management: What systems or tools are used to manage voice interactions and workflows? Please provide the answer starting with "Voice Interaction Management: ".
// // * UI (User Interface): What technologies or frameworks are used for the user interface of the AI agent or its management platform? Please provide the answer starting with "UI: ".
// // * Database & Storage: What types of databases and storage solutions are used to store data? Please provide the answer starting with "Database & Storage: ".
// // * Analytics & Monitoring: What tools or platforms are used for analytics and monitoring the performance and usage of the AI agent? Please provide the answer starting with "Analytics & Monitoring: ".`;

// //     try {
// //       // --- Call for Base Details ---
// //       const baseDetailsResponse = await fetch("http://localhost:3001/api/llm", {
// //         // Your backend API endpoint
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           prompt: promptBase,
// //           userId: /* Get user ID securely */ "user_D75JVwSwPce6km",
// //           organizationId: /* Get org ID securely */ "org_2Dmpx8kwvsFR2F",
// //           model: "gemini",
// //         }),
// //       });

// //       if (!baseDetailsResponse.ok) {
// //         const errorData = await baseDetailsResponse.json();
// //         console.error("Error from backend (base details):", errorData);
// //         return res
// //           .status(baseDetailsResponse.status)
// //           .json({ error: "Failed to fetch base agent details" });
// //       }

// //       const baseDetailsData = await baseDetailsResponse.json();

// //       // --- Call for Technical Stack Details ---
// //       const techStackResponse = await fetch("/api/llm", {
// //         // Your backend API endpoint
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           prompt: promptTechStack,
// //           userId: /* Get user ID securely */ "user_D75JVwSwPce6km",
// //           organizationId: /* Get org ID securely */ "org_2Dmpx8kwvsFR2F",
// //           model: "gemini",
// //         }),
// //       });

// //       if (!techStackResponse.ok) {
// //         const errorData = await techStackResponse.json();
// //         console.error("Error from backend (tech stack):", errorData);
// //         return res
// //           .status(techStackResponse.status)
// //           .json({ error: "Failed to fetch technical stack details" });
// //       }

// //       const techStackData = await techStackResponse.json();

// //       // --- Process and Combine the Responses ---
// //       const combinedDetails = {
// //         base: baseDetailsData?.answer || "", // Adjust based on your backend response structure
// //         techStack: techStackData?.answer || "", // Adjust based on your backend response structure
// //       };

// //       return res.status(200).json(combinedDetails);
// //     } catch (error) {
// //       console.error("Error calling backend API:", error);
// //       return res
// //         .status(500)
// //         .json({ error: "Failed to communicate with the backend" });
// //     }
// //   } else {
// //     res.setHeader("Allow", ["POST"]);
// //     res.status(405).end(`Method ${req.method} Not Allowed`);
// //   }
// // }


// export default async function handler(
//   req: { method: string; body: { agentName: any } },
//   res: {
//     status: (arg0: number) => {
//       (): any;
//       new (): any;
//       json: {
//         (arg0: { error?: string; base?: any; techStack?: any }): any;
//         new (): any;
//       };
//       end: { (arg0: string): void; new (): any };
//     };
//     setHeader: (arg0: string, arg1: string[]) => void;
//   }
// ) {
//   if (req.method === "POST") {
//     const { agentName } = req.body;

//     if (!agentName) {
//       return res.status(400).json({ error: "Agent name is required" });
//     }

//     const promptBase = `Provide detailed information about the AI agent named "${agentName}", focusing on the following aspects separately::1. Target Audience: What is the ideal business size this AI agent is tailored for? Please provide the answer starting with "Target Audience: ".

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
//     const promptTechStack = `Detail the technical stack used to build the AI agent named "${agentName}", specifically addressing the following components separately: * Speech Recognition: What technologies or software are used for speech recognition? Please provide the answer starting with "Speech Recognition: ".
// * NLP (Natural Language Processing): What NLP libraries, frameworks, or models are employed? Please provide the answer starting with "NLP: ".
// * Text-to-Speech (TTS): What technologies or software are used for text-to-speech functionality? Please provide the answer starting with "Text-to-Speech: ".
// * Backend Infrastructure: Describe the main components and technologies used for the backend infrastructure (e.g., cloud providers, server technologies, programming languages). Please provide the answer starting with "Backend Infrastructure: ".
// * Voice Interaction Management: What systems or tools are used to manage voice interactions and workflows? Please provide the answer starting with "Voice Interaction Management: ".
// * UI (User Interface): What technologies or frameworks are used for the user interface of the AI agent or its management platform? Please provide the answer starting with "UI: ".
// * Database & Storage: What types of databases and storage solutions are used to store data? Please provide the answer starting with "Database & Storage: ".
// * Analytics & Monitoring: What tools or platforms are used for analytics and monitoring the performance and usage of the AI agent? Please provide the answer starting with "Analytics & Monitoring: ".`;

//     try {
//       // --- Call for Base Details ---
//       const baseDetailsResponse = await fetch("http://localhost:4000/api/llm", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           prompt: promptBase,
//           userId: "user_D75JVwSwPce6kk", // Replace with secure method
//           organizationId: "org_2Dmpx8kwvsFR2F", // Replace with secure method
//           model: "gemini",
//         }),
//       });

//       if (!baseDetailsResponse.ok) {
//         const errorData = await baseDetailsResponse.json();
//         console.error("Error from backend (base details):", errorData);
//         return res
//           .status(baseDetailsResponse.status)
//           .json({ error: "Failed to fetch base agent details" });
//       }

//       const baseDetailsText = (await baseDetailsResponse.json())?.answer || "";

//       // --- Call for Technical Stack Details ---
//       // const techStackResponse = await fetch("http://localhost:4000/api/llm", {
//       //   method: "POST",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //   },
//       //   body: JSON.stringify({
//       //     prompt: promptTechStack,
//       //     userId: "user_D75JVwSwPce6km", // Replace with secure method
//       //     organizationId: "org_2Dmpx8kwvsFR2F", // Replace with secure method
//       //     model: "gemini",
//       //   }),
//       // });

//       // if (!techStackResponse.ok) {
//       //   const errorData = await techStackResponse.json();
//       //   console.error("Error from backend (tech stack):", errorData);
//       //   return res
//       //     .status(techStackResponse.status)
//       //     .json({ error: "Failed to fetch technical stack details" });
//       // }

// console.log("techStackResponse", baseDetailsText);
//       return res.status(200);
//     } catch (error) {
//       console.error("Error calling backend API:", error);
//       return res
//         .status(500)
//         .json({ error: "Failed to communicate with the backend" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }