import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { CountBadge, CountBadgeSkeleton } from "~/app/(web)/(home)/count-badge";
import { HomeToolListing } from "~/app/(web)/(home)/listing";
import {
  AlternativePreview,
  AlternativePreviewSkeleton,
} from "~/components/web/alternatives/alternative-preview";
import { NewsletterForm } from "~/components/web/newsletter-form";
import { NewsletterProof } from "~/components/web/newsletter-proof";
import { ToolQuerySkeleton } from "~/components/web/agents/agents-query";
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro";
import { config } from "~/config";
import { CategoryListing } from "../categories/(categories)/listing";
import { ToolSearch } from "~/components/web/agents/agents-search";
import { ToolFiltersProvider } from "~/contexts/tool-filter-context";
import { Homeimage } from "~/components/common/icons/homeimg";
import { InternalLink } from "~/components/web/internalLink";
import { Button } from "~/components/web/ui/button";
import { ArrowRight } from "lucide-react";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default function Home({ searchParams }: PageProps) {
  return (
    <>
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between w-full sm:px-0 lg:px-8 py-12 lg:py-24 gap-8 lg:gap-0 lg:mt-[-380px] lg:mb-[-380px]">
        <div className="flex flex-col gap-y-4 w-full lg:w-1/2 text-center lg:text-left">
          <div className="bg-green-900 text-white text-xs font-bold px-3 py-1 rounded-lg w-fit mx-auto lg:mx-0">
            Agents Marketplace
          </div>

          <Intro className="flex flex-col items-center lg:items-start">
            <IntroTitle className="max-w-[45rem] font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl/[1.1]">
              AI Agent Marketplace & Community
            </IntroTitle>

            <IntroDescription className="text-sm sm:text-base md:text-lg lg:text-xl lg:mt-2 max-w-[50rem] leading-relaxed">
              The software we know and consume has undergone a radical
              transformation in the past year, largely driven by the emergence
              of AI Agents.
            </IntroDescription>
          </Intro>

          <div className="flex gap-4 justify-center lg:justify-start">
            <Button suffix={<ArrowRight />} asChild>
              <InternalLink
                href={`/agents-list`}
                // rel={category.isFeatured ? "noopener noreferrer" : undefined}
                eventName="click_website"
                // eventProps={{ url: category.website }}
              >
                {/* Find agents */} Explore Agents
              </InternalLink>
            </Button>

            <Button
              asChild
              className="bg-black text-white border border-white hover:border-gray-300"
            >
              <InternalLink
                href={`/agents-list`}
                // rel={category.isFeatured ? "noopener noreferrer" : undefined}
                eventName="click_website"
                // eventProps={{ url: category.website }}
              >
                {/* Find agents */} Join Community
              </InternalLink>
            </Button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center md:mt-[-200px] md:mb-[-200px] mt-[-350px] mb-[-350px] lg:mt-0 lg:mb-0">
          <Homeimage className="w-full max-w-md lg:max-w-lg h-auto" />
        </div>
      </section>
      <Suspense fallback={<ToolQuerySkeleton />}>
        {/* <HomeToolListing searchParams={searchParams} /> */}

        <CategoryListing />
      </Suspense>

      <Suspense fallback={<AlternativePreviewSkeleton />}>
        <AlternativePreview />
      </Suspense>
    </>
  );
}
