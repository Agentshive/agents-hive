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


type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default function Home({ searchParams }: PageProps) {
  return (
    <>
      {/* <div className="inline-block px-3 py-1 text-xs font-semibold text-white bg-green-900 rounded-md w-fit pd-20">Agents Marketplce</div> */}
      <section className="flex flex-col gap-y-4 w-full mb-[2vh] px-4 lg:px-0">
      <div className="bg-green-900 text-white text-xs font-bold px-3 py-1 rounded-lg w-fit">Agents Marketplce</div>
        <Intro className="flex flex-col items-start lg:items-start">
         
          <IntroTitle className="max-w-[45rem] text-left font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl/[1.1]">
            
            {/* Discover {config.site.tagline} */}
            {/* Discover, Hire, Deploy AI Agents */}AI Agent Marketplace & Community
          </IntroTitle>

          {/* <IntroDescription className="lg:mt-2">{config.site.description}</IntroDescription> */}
          <IntroDescription className="text-sm sm:text-base md:text-lg lg:text-xl text-left lg:mt-2 max-w-[50rem] leading-relaxed">
            {/* Tap into agentic workforce, available all day, every day, to keep
            things moving forward */} The software we know and consume has undergone a radical transformation in the past year,largely driven by the emergence of AI Agents
          </IntroDescription>

          {/* <Suspense fallback={<CountBadgeSkeleton />}>
            <CountBadge />
          </Suspense> */}
        </Intro>

        {/* <NewsletterForm
          size="lg"
          className="max-w-sm mx-auto items-center text-center"
          buttonProps={{ children: "Join our community", size: "md", variant: "fancy" }}
        >
          <NewsletterProof />
        </NewsletterForm> */}
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
