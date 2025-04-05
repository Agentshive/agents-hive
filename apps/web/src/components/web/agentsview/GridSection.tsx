import { FeatureIcon } from "~/components/common/icons/featureicon";
import { TickIcon } from "~/components/common/icons/tickicon";
import { UsecaseIcon } from "~/components/common/icons/usecases";

type GridSectionType =
  | "features"
  | "useCases"
  | "industry"
  | "functionsSupportDeals";

interface GridSectionProps {
  type: GridSectionType;
  title?: string;
  items?: string | string[];
  functions?: string | string[];
  support?: string | string[];
  deals?: string | string[];
  fullWidth?: boolean;
}

export const GridSection = ({
  type,
  title = "",
  items,
  functions,
  support,
  deals,
  fullWidth = false,
}: GridSectionProps) => {
  const renderContent = () => {
    switch (type) {
      case "features":
      case "useCases":
        return (
          <ul className="space-y-3">
            {items ? (
              (Array.isArray(items) ? items : [items]).map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-400">
                    <TickIcon />
                  </span>
                  <p className="text-gray-300">{item}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-400">
                No {type === "features" ? "features" : "use cases"} available.
              </p>
            )}
          </ul>
        );

      case "industry":
        return (
          <div className="flex flex-wrap py-[10%] mb-2 gap-2">
            {items ? (
              (Array.isArray(items) ? items : [items]).map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 border border-white rounded-md text-sm"
                >
                  {item}
                </span>
              ))
            ) : (
              <p className="text-gray-400">No industries specified.</p>
            )}
          </div>
        );

      case "functionsSupportDeals":
        return (
          <div className="flex flex-col gap-6">
            {/* Functions */}
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Functions</h2>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(functions) ? functions : [functions])?.map(
                  (func, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 border border-white rounded-md text-sm"
                    >
                      {func}
                    </span>
                  )
                ) || <p className="text-gray-400">No functions specified.</p>}
              </div>
            </div>

            {/* Support */}
            <div>
              <h2 className="text-xl font-bold mb-2 text-white">Support</h2>
              <p className="text-gray-300">
                {support || "No support information available."}
              </p>
            </div>

            {/* Deals */}
            <div>
              <h2 className="text-xl font-bold mb-2 text-white">Deals</h2>
              <p className="text-gray-300">
                {deals || "No deals currently available."}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`bg-[#1b1b1b] p-6 rounded-lg shadow-md ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {type !== "functionsSupportDeals" && type !== "industry" && (
        <div className="flex items-center gap-3 mb-4">
          {type === "features" && <FeatureIcon />}
          {type === "useCases" && <UsecaseIcon />}
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      )}

      {type === "industry" && title && (
        <h2 className="text-xl font-bold mb-4">{title}</h2>
      )}

      {renderContent()}
    </div>
  );
};
