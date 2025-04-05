import { ArrowUpRightIcon, StarsIcon } from "lucide-react";
import { H4 } from "~/components/common/heading";
import { GlobesIcon } from "~/components/common/icons/globe";
import { ExternalLink } from "~/components/web/external-link";
import { FaviconImage } from "~/components/web/ui/favicon";
import { IntroDescription } from "~/components/web/ui/intro";

export default function ToolMainCard({ tool }: { tool: any }) {
    // Default values for Phala Network if tool data is incomplete
    const toolData = {
      name: tool?.name || "Phala Network",
      faviconUrl: tool?.faviconUrl,
      description: tool?.description || "Phala Network provides a decentralized, secure cryptographic computing platform for Web3, enabling trustless AI agent development with Trusted Execution Environment (TEE) technology and unprecedented computational privacy and security.",
      tagline: tool?.tagline || "Secure, trustless AI computing without compromise.",
      website: tool?.website || "#",
      hostingUrl: tool?.hostingUrl || "#",
      cost: tool?.cost || 20,
      category: tool?.category || "AI Agent Builders"
    };
  
    return (
      <div className="w-full rounded-lg overflow-hidden border border-gray-800 bg-black">
        <div className="p-6 pb-0">
          {/* Top Row - Category and Free Trial */}
          <div className="flex justify-between items-center mb-6">
            <div className="border border-gray-700 rounded-full px-3 py-1">
              <span className="text-gray-300 text-sm">{tool.category}</span>
            </div>
            
            <div className="rounded-full px-4 py-2 flex items-center border border-orange-500">
              <svg viewBox="0 0 24 24" width="16" height="16" className="text-orange-500 mr-2">
                <rect width="18" height="18" x="3" y="3" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M9 9h6v6H9z" fill="currentColor" />
              </svg>
              <span className="text-white text-sm font-medium">30 days free trial</span>
            </div>
          </div>
          
          {/* Logo and Title Section */}
          <div className="flex items-start gap-4 mb-6">
            <div className="h-12 w-12 bg-black rounded-md overflow-hidden flex items-center justify-center border border-gray-800">
              {toolData.faviconUrl ? (
                <FaviconImage src={toolData.faviconUrl} title={toolData.name} className="h-full w-full" />
              ) : (
                <div className="h-full w-full bg-black flex items-center justify-center">
                  <span className="text-green-400 text-2xl font-bold">P</span>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center">
                <H4 className="text-2xl font-bold text-white">{toolData.name}</H4>
                <span className="text-green-400 ml-2">✦</span>
                <span className="text-white ml-2">⊕</span>
              </div>
            </div>
          </div>
          
          {/* Tagline and Description */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 text-white">
              {toolData.tagline}
            </h2>
            
            <IntroDescription className="text-gray-400 text-base">
              {toolData.description}
            </IntroDescription>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 w-full"></div>
        
        {/* Footer with Demo Button and Price */}
        <div className="p-6 flex justify-between items-center">
          <button className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1">
            <ExternalLink
              href={toolData.hostingUrl}
              eventName="click_demo"
              className="flex items-center"
            >
              Request Demo
              <ArrowUpRightIcon className="ml-1" size={14} />
            </ExternalLink>
          </button>
          
          <div className="text-orange-500 text-xl font-bold">
            ${toolData.cost}/mon
          </div>
        </div>
      </div>
    );
  }