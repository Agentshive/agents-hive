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
import { H1, H3, H4, H5 } from "~/components/common/heading";
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
import { GridSection } from "./GridSection";
import { SubscriptionCard } from './SubscriptionCard';

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

const proPlanFeatures = [
  {
    text: "100,000 Credits",
  },
  {
    text: "3 Sequencing Users",
    subFeatures: ["$90 / seat / mo for additional sequencing users"],
  },
  // ... add more features
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
        <Section>
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

          <Section.Sidebar className="max-md:contents">
            {/* <RepositoryDetails tool={tool} className="max-md:order-3" /> */}

            {/* Advertisement */}
            {/* <Suspense fallback={<AdCardSkeleton className="max-md:order-4" />}>
              <AdCard type="ToolPage" className="max-md:order-4" />
            </Suspense> */}

            {/* Featured */}
            {/* <Suspense>
              <FeaturedTools className="max-md:order-10" />
            </Suspense> */}
          </Section.Sidebar>
        </Section>

        {/* Related */}
        <Suspense
          fallback={
            <Listing
              title={`Open source alternatives similar to ${tool.name}:`}
            >
              <ToolListSkeleton count={3} />
            </Listing>
          }
        >
          <RelatedTools tool={tool} />
        </Suspense>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
        <div>
          

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
  <div className="lg:col-span-2">
    <div className="text-white p-0 rounded-[4px] flex flex-col md:flex-row gap-6 w-full ">
      <div
        className="bg-[#1b1b1b] p-6 rounded-[4px] flex-grow w-[420]"
        style={{
          clipPath:
            "polygon(0 0, calc(100% - 42px) 0, 100% 42px, 100% 100%, 0 100%)",
        }}
      >
        <div className="flex flex-1 flex-col items-start gap-4 max-md:order-1 md:gap-6">
          <div className="flex w-full flex-col items-start gap-y-4">
            <Stack className="w-full">
              <FaviconImage src={tool.faviconUrl} title={tool.name} />

              <div className="flex flex-1">
                <H4 className="!leading-snug truncate pr-2">
                  {tool.name}
                </H4>
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
              {tool.website && (
                <Button suffix={<ArrowUpRightIcon />} asChild>
                  <ExternalLink
                    href={tool.website}
                    rel={
                      tool.isFeatured ? "noopener noreferrer" : undefined
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
              ${tool.price}/mon
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
              className="px-3 py-1 border border-gray-500 rounded-md text-sm"
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
              className="px-3 py-1 border border-gray-500 rounded-md text-sm"
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
      <GridSection 
        type="features" 
        title="Key Features" 
        items={tool.keyFeatures} 
      />
      
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
          support={tool.support} 
          deals={tool.deals} 
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
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Choose Your Plan
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Growth Plan */}
          <SubscriptionCard
            title="Growth"
            price="Starting from $1460 per month, billed annually"
            description="For teams looking to get started with signal data"
            features={growthPlanFeatures}
          />

          {/* Pro Plan */}
          <SubscriptionCard
            title="Pro"
            price="Starting from $2490 per month, billed annually"
            description="For growing teams with more advanced needs"
            features={proPlanFeatures}
            ctaLabel="Get Started"
          />

          {/* Add more plans as needed */}
        </div>
      </div>
    </div>

          {tool.content && (
            <Markdown code={tool.content} className="max-md:order-5 mt-10" />
          )}

          {/* Stacks */}
          {!!tool.stacks.length && (
            <Stack
              size="lg"
              direction="column"
              className="w-full max-md:order-6 md:gap-y-6"
            >
              <H4 as="strong">Technical Stack:</H4>
              <StackList stacks={tool.stacks} />
            </Stack>
          )}

          {/* 
          <div className="text-white rounded-lg max-w-full mx-auto">
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

          {/* Technical Stack Section */}
          {!!tool.stacks.length && (
            <div className="w-full max-md:order-6 space-y-4">
              <h4 className="text-lg font-bold">Technical Stack:</h4>
              <div className="flex flex-wrap gap-2">
                {tool.stacks.map((stack, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm"
                  ></span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
