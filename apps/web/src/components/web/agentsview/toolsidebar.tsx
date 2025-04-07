export default function ToolSidebar({ tool }: { tool: any }) {
  return (
    <div className="lg:col-span-1 mb-16 h-full">
      <div className="bg-[#1b1b1b] p-4 rounded-[4px] w-full h-full ">
        {/* Skills Section */}
        <h3 className="text-lg font-semibold">Ideal for</h3>
        <div className="flex gap-2 mt-2 flex-wrap">
          {tool.idealFor?.map((idealFor: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 border border-gray-500 rounded-md text-sm"
            >
              {idealFor}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-semibold mt-4">Language</h3>
        <div className="flex gap-2 mt-2 flex-wrap">
          {tool.languages?.map((language: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 border border-gray-500 rounded-md text-sm"
            >
              {language}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
