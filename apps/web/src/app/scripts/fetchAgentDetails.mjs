// // fetchAgentDetails.ts
// import fetch from 'node-fetch';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function fetchAndStoreAgentDetails() {
//   try {
//     // Step 1: Get all agent names from tool table
//     const tools = await prisma.tool.findMany({
//       select: { name: true },
//     });

//     console.log(`Found ${tools.length} agent(s)`);
//     for (const tool of tools) {
//       const agentName = tool.name;
//       console.log(`Fetching details for: ${agentName}`);
//       const promptBase = `Give me a brief introduction about ${agentName}. This is a prebuilt AI Agent. Give details like what this agent does, how it helps, what are its strengths and weaknesses.`;

//       // Step 2: Call the external API
//       const response = await fetch('http://localhost:4000/api/llm', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           prompt: promptBase,
//           userId: 'system', // replace if needed
//           organizationId: 'system', // replace if needed
//           model: 'gemini',
//         }),
//       });

//       if (!response.ok) {
//         console.warn(`API failed for ${agentName}: ${response.status}`);
//         continue;
//       }

//       const json = await response.json();
//       const baseDetailsText = json.answer;
//       console.log(`Received details for ${agentName}:`, baseDetailsText);

//       // Step 3: Store in agentDetails table
//       // Note: This is commented out in your original code
//       // await prisma.tool.create({
//       //   data: {
//       //     name, agentName,
//       //     baseDetails: baseDetailsText,
//       //   },
//       // });
//       console.log(`Stored details for: ${agentName}`);
//     }
//   } catch (err) {
//     console.error('Error in fetchAndStoreAgentDetails:', err);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// fetchAndStoreAgentDetails();

// fetchAgentDetails.mjs - ES Module version with .mjs extension
import fetch from "node-fetch";
import { PrismaClient } from "@prisma/client";
import {
  getPromptBase,
  getPromptBaseV2,
  parseAgentDetails,
} from "./constants.mjs";

const prisma = new PrismaClient();
// function parseAgentDetails(rawText) {
//   const result = {};

//   const sectionRegex = /\*\*(\d+)\.\s+(.+?):\*\*\s+([\s\S]*?)(?=\*\*\d+\.|$)/g;

//   let match;
//   while ((match = sectionRegex.exec(rawText)) !== null) {
//     const index = match[1].trim(); // "1"
//     const title = match[2].trim(); // "Target Audience"
//     const content = match[3].trim(); // text under that section

//     const key = title
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '_')
//       .replace(/^_+|_+$/g, ''); // convert to camel_case key

//     result[key] = content;
//   }

//   return result;
// }
function cleanJsonString(str) {
  return str
    .replace(/```json\s*/i, "") // remove starting ```json
    .replace(/```$/, "") // remove ending ```
    .trim(); // trim whitespace
}

async function fetchAndStoreAgentDetails() {
  try {
    // Step 1: Get all agent names from tool table
    const tools = await prisma.tool.findMany({
      select: { name: true, slug: true, id: true, website: true },
    });

    console.log(`Found ${tools.length} agent(s)`);
    for (const tool of tools) {
      const agentName = tool.name;
      const agentId = tool.id;
      const website = tool.website;
      console.log(`Fetching details for: ${agentName}`);
      const promptBase = getPromptBaseV2(agentName,website);
      // const promptBase = "test"

      // Step 2: Call the external API
      const response = await fetch("http://localhost:4000/api/llm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: promptBase,
          userId: "user_L5s7Bam83tqsq1",
          organizationId: "org_EE26ygnLdJX1Ts",
          model: "gemini",
        }),
      });

      if (!response.ok) {
        console.warn(`API failed for ${agentName}: ${response.status}`);
        continue;
      }

      // const json = await response.json();
      // const data = json.response;
      // const cleaned = cleanJsonString(data);
      // const fetchedData = JSON.parse(cleaned);
      const json = await response.json();

      if (!json.response || typeof json.response !== "string") {
        throw new Error(
          `Invalid or missing 'response' field: ${JSON.stringify(json)}`
        );
      }

      const cleaned = cleanJsonString(json.response);

      let fetchedData;
      try {
        fetchedData = JSON.parse(cleaned);
      } catch (err) {
        throw new Error(`Failed to parse cleaned JSON: ${cleaned}`);
      }

      await prisma.tool.update({
        where: { id: agentId },
        data: {
          // name: fetchedData.name,
          // website: fetchedData.website,
          // slug: fetchedData.slug,
          repository: fetchedData.repository,
          tagline: fetchedData.tagline,
          description: fetchedData.description,
          content: fetchedData.content,
          technicalSpecifications: fetchedData.technicalSpecifications,
          useCases: fetchedData.useCases,
          // category: fetchedData.category,
          price: fetchedData.price,
          cost: fetchedData.cost,
          features: fetchedData.features,
          keyFeatures: fetchedData.keyFeatures,
          submitterNote: fetchedData.submitterNote,
          hostingUrl: fetchedData.hostingUrl,
          x: fetchedData.x,
          linkedIn: fetchedData.linkedIn,
          benefits: fetchedData.benefits,
          idealFor: fetchedData.idealFor,
          integrations: fetchedData.integrations,
          languages: fetchedData.languages,
          support: fetchedData.support,
          functions: fetchedData.functions,
          deals: fetchedData.deals,
          industry: fetchedData.industry,
          freeTrial: fetchedData.freeTrial,
          isPopular: fetchedData.isPopular,
          customerStories: fetchedData.customerStories,
          openSourceInfo: fetchedData.openSourceInfo,
          discountCode: fetchedData.discountCode,
          form: fetchedData.form,
          discountAmount: fetchedData.discountAmount,
          firstCommitDate: fetchedData.firstCommitDate
            ? new Date(fetchedData.firstCommitDate)
            : null,
          lastCommitDate: fetchedData.lastCommitDate
            ? new Date(fetchedData.lastCommitDate)
            : null,
          // status: fetchedData.status ?? "Draft",
          // publishedAt: fetchedData.publishedAt ? new Date(fetchedData.publishedAt) : null
        },
      });

      console.log(`Stored details for: ${agentName}`);
    }
  } catch (err) {
    console.error("Error in fetchAndStoreAgentDetails:", err);
  } finally {
    await prisma.$disconnect();
  }
}

fetchAndStoreAgentDetails();
