import { ReactNode } from "react";

interface ToolUseCasesProps {
  useCases?: string[];
  className?: string;
}

export default function keyFeatures({ useCases, className = "" }: ToolUseCasesProps) {
  // Default use cases for Phala Network if none provided
  const defaultUseCases = [
    "AI & Machine Learning",
    "Decentralized Cloud Computing",
    "Privacy-Preserving Smart Contracts",
    "Web3 & DeFi Infrastructure",
    "Gaming & Metaverse",
    "IoT & Edge Computing",
    "Data Privacy & Analytics",
    "Confidential DAOs & Governance",
    "Healthcare & Biomedical Research"
  ];

  const displayedUseCases = useCases || defaultUseCases;

  return (
    <div className={`bg-[#141414] p-6 rounded-lg ${className}`}>
      {/* Header with icon and title */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-[#392900] rounded-lg flex items-center justify-center">
          <svg 
            viewBox="0 0 24 24" 
            width="24" 
            height="24" 
            className="text-yellow-400"
          >
            <path 
              fill="currentColor" 
              d="M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5z" 
            />
            <path 
              fill="currentColor" 
              d="M6.5 8h11v2h-11zm0 4h11v2h-11zm0 4h11v2h-11z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-semibold text-white">Use Cases</h2>
      </div>

      {/* List of use cases with green check marks and vertical line */}
      <div className="relative ml-6">
        {/* Enhanced vertical line - now extends further and is more visible */}
        <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-gray-600 line-height:8"></div>
        
        <div className="space-y-4">
          {displayedUseCases.map((useCase, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center z-10">
                <svg 
                  viewBox="0 0 24 24" 
                  width="16" 
                  height="16" 
                  className="text-black"
                >
                  <path 
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" 
                    fill="currentColor" 
                  />
                </svg>
              </div>
              <span className="text-gray-300 text-lg">{useCase}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Usage example:
// <ToolUseCases 
//   useCases={[
//     "AI & Machine Learning",
//     "Decentralized Cloud Computing",
//     "Privacy-Preserving Smart Contracts"
//   ]} 
//   className="mt-6"
// />