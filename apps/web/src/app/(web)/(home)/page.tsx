import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import ModalWrapper from "~/components/web/ui/modelwrapper";
import { CountBadge, CountBadgeSkeleton } from "~/app/(web)/(home)/count-badge";
import { HomeToolListing } from "~/app/(web)/(home)/listing";
import {
  AlternativePreview,
  AlternativePreviewSkeleton,
} from "~/components/web/alternatives/alternative-preview";
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
      <section className="flex flex-col lg:flex-row items-center justify-between w-full py-6 lg:mt-[-80px] gap-8">
        <div className="flex flex-col gap-y-6 w-full lg:w-1/2 text-center lg:text-left">
          <div className="bg-[#131c0b] text-white text-xs px-4 py-2 rounded-[4px] border border-white w-fit mx-auto lg:mx-0">
            Agents Marketplace
          </div>
          <Intro className="flex flex-col items-center lg:items-start">
            <IntroTitle
              className="lg:w-[751px] lg:h-[154px] lg:max-w-[45rem] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[120%] max-w-3xl"
              style={{ fontFamily: "'raela-grotesque'" }}
            >
              AI Agent Marketplace & Community
            </IntroTitle>
            <IntroDescription className="text-sm sm:text-base md:text-lg lg:text-md mt-2 max-w-2xl leading-relaxed">
              The software we know and consume has undergone a radical
              transformation in the past year, largely driven by the emergence
              of AI Agents.
            </IntroDescription>
          </Intro>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start ">
            <Button
              // className="w-full flex justify-center items-center py-2 bg-white rounded-[4px]"
              // >
                 className="rounded-[4px] bg-white"
                 >
              <InternalLink href={`/agents-list`} eventName="click_website">
              <span className="flex items-center justify-center gap-2 w-full">
              Explore Agents
                          <ArrowRight className="w-4 h-4" />
                        </span>
              </InternalLink>
            </Button>
            <ModalWrapper />
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center">
          <Homeimage className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl h-auto" />
        </div>
      </section>
      <Suspense fallback={<ToolQuerySkeleton />}>
        <CategoryListing />
      </Suspense>
      <Suspense fallback={<AlternativePreviewSkeleton />}>
        <AlternativePreview />
      </Suspense>
    </>
  );
}
