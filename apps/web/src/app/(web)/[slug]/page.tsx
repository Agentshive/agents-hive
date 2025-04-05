import {
  ArrowUpRightIcon,
  HashIcon,
  Star,
  Hash,
  StarIcon,
  GlobeIcon,
  CheckIcon,
  CheckCircle,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense, cache } from "react";
import type { ImageObject } from "schema-dts";
import { FeaturedTools } from "~/app/(web)/[slug]/featured-tools";
import { RelatedTools } from "~/app/(web)/[slug]/related-tools";
import { H1, H2, H3, H4, H5 } from "~/components/common/heading";
import { Stack } from "~/components/common/stack";
import { AdCard, AdCardSkeleton } from "~/components/web/ads/ad-card";
import { ExternalLink } from "~/components/web/external-link";
import { Listing } from "~/components/web/listing";
import { Markdown } from "~/components/web/markdown";
import { RepositoryDetails } from "~/components/web/repository-details";
import { ShareButtons } from "~/components/web/share-buttons";
import { StackList } from "~/components/web/stacks/stack-list";
import { ToolAlternatives } from "~/components/web/agents/agents-alternatives";
import { ToolListSkeleton } from "~/components/web/agents/agents-list";
import { Breadcrumbs } from "~/components/web/ui/breadcrumbs";
import { Button } from "~/components/web/ui/button";
import { FaviconImage } from "~/components/web/ui/favicon";
import { IntroDescription } from "~/components/web/ui/intro";
import { Section } from "~/components/web/ui/section";
import { Tag } from "~/components/web/ui/tag";
import { metadataConfig } from "~/config/metadata";
import { getToolSuffix } from "~/lib/tools";
import type { ToolOne } from "~/server/web/tools/payloads";
import { findTool, findToolSlugs } from "~/server/web/tools/queries";
import { slugify } from "@curiousleaf/utils";
import { StarsIcon } from "~/components/common/icons/star";
import { GlobesIcon } from "~/components/common/icons/globe";
import { HashedIcon } from "~/components/common/icons/hash";
import { ReviewIcon } from "~/components/common/icons/reviews";
import { FeatureIcon } from "~/components/common/icons/featureicon";
import { TickIcon } from "~/components/common/icons/tickicon";
import { Card } from "~/components/web/ui/card";
import { GridSection } from "../../../components/web/agentsview/GridSection";
import { SubscriptionCard } from "../../../components/web/agentsview/SubscriptionCard";
import ToolMainCard from "../../../components/web/agentsview/toolmaincard";
import ToolSidebar from "../../../components/web/agentsview/toolsidebar";
import { FreeTrialIcon } from "~/components/common/icons/freetrial";
import KeyFeatures from "~/components/web/agentsview/feat";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const tags = [
  "multi-layer-security",
  "secure-ai-computing",
  "decentralized-ai",
];

const ratings = {
  overall: 3.9,
  count: 2033,
  sources: [
    { rating: 3.9, color: "text-red-500", icon: "🔴" },
    { rating: 3.8, color: "text-blue-500", icon: "🔵" },
    { rating: 3.8, color: "text-green-500", icon: "🟢" },
  ],
};

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

const getTool = cache(async ({ params }: PageProps) => {
  const { slug } = await params;
  const tool = await findTool({ where: { slug } });

  if (!tool) {
    notFound();
  }

  return tool;
});

const getMetadata = (tool: ToolOne): Metadata => {
  return {
    title: `${tool.name}: ${getToolSuffix(tool)}`,
    description: tool.description,
  };
};

export const generateStaticParams = async () => {
  const tools = await findToolSlugs({});
  return tools.map(({ slug }) => ({ slug }));
};

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const tool = await getTool(props);
  const url = `/${tool.slug}`;

  return {
    ...getMetadata(tool),
    alternates: { ...metadataConfig.alternates, canonical: url },
    openGraph: { url, type: "website" },
  };
};

export default async function ToolPage(props: PageProps) {
  const tool = await getTool(props);
  console.log(tool);
  const { title } = getMetadata(tool);
  const jsonLd: ImageObject[] = [];

  if (tool.screenshotUrl) {
    jsonLd.push({
      "@type": "ImageObject",
      url: tool.screenshotUrl,
      contentUrl: tool.screenshotUrl,
      width: "1280",
      height: "720",
      caption: `A screenshot of ${tool.name}`,
    });
  }

  if (tool.faviconUrl) {
    jsonLd.push({
      "@type": "ImageObject",
      url: tool.faviconUrl,
      contentUrl: tool.faviconUrl,
      width: "144",
      height: "144",
      caption: `A favicon of ${tool.name}`,
    });
  }

  const featuresList = Array.isArray(tool.features)
    ? tool.features
    : tool.features
    ? [tool.features]
    : [];

  return (
    <>
      <div className="flex flex-col gap-12">
        <Section.Content className="max-md:contents">
          <Breadcrumbs
            items={[
              {
                href: "/categories",
                name: "Categories",
              },
              // {
              //   href: `/categories/${slugify(tool.category)}`,
              //   name: tool.category,
              // },
              {
                href: `/${tool.slug}`,
                name: tool.name,
              },
            ]}
          />

          {/* 
            <ShareButtons title={`${title}`} className="max-md:order-9" /> */}
        </Section.Content>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <div
                className="text-white p-[1px] rounded-[4px] flex flex-col gap-6 w-full bg-gradient-to-b from-orange-500 to-black"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 42px) 0, 100% 42px, 100% 100%, 0 100%)",
                }}
              >
                <div
                  className="bg-[#1b1b1b] p-6 rounded-[4px] flex-grow w-full"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 42px) 0, 100% 42px, 100% 100%, 0 100%)",
                  }}
                >
                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex w-full flex-col  gap-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-4 py-2 border border-white rounded-md text-sm">
                            {tool.category}
                          </span>
                        </div>

                        {/* Free trial info on the right */}
                        <div
                          className="rounded-[30px] px-4 py-2 flex items-end border border-orange-500"
                          style={{
                            background:
                              "linear-gradient(to right,rgb(63, 27, 6) 5%, #37140100 30%, #000000 100%)",
                          }}
                        >
                          <FreeTrialIcon className="text-orange-500 mr-2" />
                          <span className="text-white text-sm font-medium">
                            {tool.freeTrial} free trial
                          </span>
                        </div>
                      </div>
                      <Stack className="w-full">
                        <FaviconImage src={tool.faviconUrl} title={tool.name} />

                        <div className="flex flex-1">
                          <H2 className="!leading-snug truncate pr-2">
                            {tool.name}
                          </H2>
                          <StarsIcon />
                          <GlobesIcon />
                        </div>
                      </Stack>

                      {tool.description && (
                        <IntroDescription>{tool.description}</IntroDescription>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3"></div>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center mt-4">
                      <ToolAlternatives alternatives={tool.alternatives} />

                      <Stack size="sm" className="w-full">
                        {/* Added two prominent buttons similar to the image */}

                        {tool.website && (
                          <Button suffix={<ArrowUpRightIcon />} asChild>
                            <ExternalLink
                              href={tool.website}
                              rel={
                                tool.isFeatured
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              eventName="click_website"
                              eventProps={{ url: tool.website }}
                            >
                              Visit {tool.name}
                            </ExternalLink>
                          </Button>
                        )}

                        {tool.hostingUrl && (
                          <Button
                            variant="secondary"
                            suffix={<ArrowUpRightIcon />}
                            asChild
                          >
                            <ExternalLink
                              href={tool.hostingUrl}
                              eventName="click_ad"
                              eventProps={{
                                url: tool.hostingUrl,
                                type: "ToolPage",
                              }}
                            >
                              Self-host with Easypanel
                            </ExternalLink>
                          </Button>
                        )}

                        {tool.discountAmount && (
                          <p className="ml-auto flex-1 pl-2 text-sm text-end text-balance text-green-600 dark:text-green-400">
                            {tool.discountCode
                              ? `Use code ${tool.discountCode} for ${tool.discountAmount}!`
                              : `Get ${tool.discountAmount} with our link!`}
                          </p>
                        )}
                      </Stack>

                      <span className="text-orange-400 font-bold">
                        {tool.cost === 0 ? "Free" : `$${tool.cost}/mon`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 mb-16 h-full">
              <div className="bg-[#1b1b1b] p-4 rounded-[4px] w-full h-full ">
                {/* Skills Section */}

                <h3 className="text-lg font-semibold">Ideal for</h3>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {(tool as any).idealFor?.map(
                    (idealFor: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 border border-white rounded-md text-sm"
                      >
                        {idealFor}
                      </span>
                    )
                  )}
                </div>

                <h3 className="text-lg font-semibold mt-4">Language</h3>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {(tool as any).languages?.map(
                    (language: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 border border-white rounded-md text-sm"
                      >
                        {language}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* <GridSection
              type="features"
              title="Key Features"
              items={tool.keyFeatures}
            /> */}
          
      <KeyFeatures />
   

            <GridSection
              type="useCases"
              title="Use Cases"
              items={tool.useCases}
            />

            <div className="flex flex-col gap-6">
              <GridSection
                type="industry"
                title="Industry"
                items={tool.industry}
                fullWidth
              />

              <GridSection
                type="functionsSupportDeals"
                functions={tool.functions}
                support={tool.support ?? undefined}
                deals={tool.deals ?? undefined}
                fullWidth
              />
            </div>
          </div>

          {tool.videoUrl && (
            <iframe
              key={tool.videoUrl}
              src={tool.videoUrl.replace("watch?v=", "embed/")}
              title={`Video of ${tool.name}`}
              width="1280"
              height="720"
              loading="lazy"
              className="aspect-video h-auto w-full rounded-md border object-cover max-md:order-2"
              allowFullScreen
            />
          )}

          <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Growth Plan */}
                <SubscriptionCard
                  title="Growth"
                  price="Starting from $1460 per month, billed annually"
                  description="For teams looking to get started with signal data"
                  features={growthPlanFeatures}
                  ctaLabel="Start Now"
                  emailPlaceholder="your@email.com"
                />

                {/* Pro Plan */}
                <SubscriptionCard
                  title="Pro Plan"
                  price="$49/month"
                  description="Perfect for teams"
                  features={[
                    { text: "Unlimited users" },
                    {
                      text: "Priority support",
                      subFeatures: ["Email", "Live Chat"],
                    },
                  ]}
                  ctaLabel="Get Started"
                  emailPlaceholder="Enter your email"
                />

                <SubscriptionCard
                  title="Premium Plan"
                  price="$49/month"
                  description="Perfect for teams"
                  features={[
                    { text: "Unlimited users" },
                    {
                      text: "Priority support",
                      subFeatures: ["Email", "Live Chat"],
                    },
                  ]}
                  ctaLabel="Get Started"
                  emailPlaceholder="Enter your email"
                />

                {/* Add more plans as needed */}
              </div>
            </div>
          </div>

          {/* Tags Section */}
          {!!tool.topics.length && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <HashedIcon />
                <h3 className="text-lg font-semibold">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {tool.topics.map(({ slug }) => (
                  <span
                    key={slug}
                    className="px-3 py-1 border border-gray-500 rounded-md text-sm"
                  >
                    <Tag
                      key={slug}
                      href={`/topics/${slug}`}
                      prefix={<HashIcon />}
                    >
                      {slug}
                    </Tag>
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Reviews Section */}
          {/* <div className="flex items-center gap-3 mb-6">
              <ReviewIcon />
              <h3 className="text-lg font-semibold">Reviews</h3>
            </div>

            <h2 className="text-2xl font-bold">
              {ratings.overall} Ratings ({ratings.count})
            </h2>
            <p className="text-gray-400 text-sm mb-4">Overall Ratings</p>
            <p className="text-gray-300 text-sm">{tool.description}</p> */}

          {/* Ratings from different platforms */}
          {/* <div className="flex flex-wrap gap-4 mt-6">
              {ratings.sources.map((source, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className={source.color}>{source.icon}</span>
                  <p>
                    {source.rating} Ratings ({ratings.count})
                  </p>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
