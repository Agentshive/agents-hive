// components/subscription/SubscriptionCard.tsx
import React from 'react';

interface SubscriptionFeature {
  text: string;
  subFeatures?: string[];
}

interface SubscriptionCardProps {
  title: string;
  price: string;
  description: string;
  features: SubscriptionFeature[];
  ctaLabel: string;
  emailPlaceholder: string;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  price,
  description,
  features,
  ctaLabel = "Talk to sales",
  emailPlaceholder = "What's your work email?",
}) => {
  return (
    <div className="bg-black rounded-lg shadow-md p-6 max-w-md w-full border border-gray-200">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-lg font-semibold text-gray-700 mb-2">{price}</p>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Email Input */}
      <div className="mb-6">
        <input
          type="email"
          placeholder={emailPlaceholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
      </div>

      {/* CTA Button */}
      <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition mb-8 font-medium">
        {ctaLabel}
      </button>

      {/* Features List */}
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-700">
            <div className="flex items-start">
              <span className="mr-2">•</span>
              <span>{feature.text}</span>
            </div>
            {feature.subFeatures && (
              <ul className="mt-2 ml-6 space-y-2 text-gray-500">
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

// Example usage in a page:
/*
import { SubscriptionCard } from '@/components/subscription/SubscriptionCard';

const SubscriptionPage = () => {
  const growthPlanFeatures = [
    {
      text: "50,000 Credits",
    },
    {
      text: "1 Sequencing User",
      subFeatures: ["$100 / seat / mo for additional sequencing users"],
    },
    {
      text: "3 Unity Managed Gmail Mailboxes",
      subFeatures: ["$20 / mailbox / mo for additional mailboxes"],
    },
    {
      text: "Onboarding + Support",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <SubscriptionCard
        title="Growth"
        price="Starting from $1460 per month, billed annually"
        description="For teams looking to get started with signal data"
        features={growthPlanFeatures}
      />
    </div>
  );
};
*/