import React from "react";

interface SubscriptionFeature {
  text: string;
  subFeatures?: string[];
  highlight?: boolean;
}

interface SubscriptionCardProps {
  title: string;
  subtitle?: string;
  price?: string;
  billingInfo?: string;
  description: string;
  features: SubscriptionFeature[];
  ctaLabel: string;
  emailPlaceholder: string;
  isCustom?: boolean;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  subtitle,
  price,
  billingInfo,
  description,
  features,
  ctaLabel = "Talk to sales",
  emailPlaceholder = "What's your work email?",
  isCustom = false,
}) => {
  return (
    <div className="bg-[#212121] rounded-lg shadow-md p-6 w-full">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
            {subtitle && (
              <h3
                className={`text-lg ${
                  isCustom ? "text-white" : "text-white"
                } mb-2`}
              >
                {subtitle}
              </h3>
            )}
          </div>
          {isCustom && (
            <span className="bg-[#212121]text-white text-xs font-medium px-2.5 py-0.5 rounded">
              Custom
            </span>
          )}
        </div>

        {price && (
          <p className="text-xl font-semibold text-white  mb-1">{price}</p>
        )}
        {billingInfo && (
          <p className="text-sm text-white  mb-3">{billingInfo}</p>
        )}
        <p className="text-white ">{description}</p>
      </div>

      {/* Email Input */}
      <div className="mb-6">
        <input
          type="email"
          placeholder={emailPlaceholder}
          className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-[#333333]"
        />
      </div>

      {/* CTA Button */}
      <button className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-white    text-gray-700 mb-12">
        {ctaLabel}
      </button>

      {/* Features List */}
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="text-white ">
            <div className="flex items-start">
              <span className="mr-2">•</span>
              <span className={feature.highlight ? "font-semibold" : ""}>
                {feature.text}
              </span>
            </div>
            {feature.subFeatures && (
              <ul className="mt-2 ml-6 space-y-2 text-white ">
                {feature.subFeatures.map((subFeature, subIndex) => (
                  <li key={subIndex}>{subFeature}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
