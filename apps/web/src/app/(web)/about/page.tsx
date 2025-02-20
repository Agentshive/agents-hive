import type { Metadata } from "next";
import { Link } from "~/components/common/link";
import { Featured } from "~/components/web/featured";
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro";
import { Prose } from "~/components/web/ui/prose";
import { config } from "~/config";
import { metadataConfig } from "~/config/metadata";
import { addUTMTracking } from "~/utils/helpers";
import { updateUrlWithSearchParams } from "~/utils/queryString";

export const metadata: Metadata = {
  title: "About Us",
  description: `${config.site.name} is a community driven list of open source alternatives to proprietary software and applications.`,
  openGraph: { ...metadataConfig.openGraph, url: "/about" },
  alternates: { ...metadataConfig.alternates, canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Intro>
        <IntroTitle>{`${metadata.title}`}</IntroTitle>
        <IntroDescription>{metadata.description}</IntroDescription>
      </Intro>

      {/* <Featured /> */}

      <Prose>
        <h2>What is {config.site.name}?</h2>

        <p>
          <Link href="/" title={config.site.tagline}>
            {config.site.name}
          </Link>{" "}
          is a software program that uses artificial intelligence to perform
          tasks, make decisions, or interact with users. These agents can range
          from simple chatbots to complex systems capable of analyzing data,
          generating content, or even controlling autonomous vehicles
        </p>

        <h2>What Happened?</h2>

        <p>
          One hypothesis is that the popularity of OpenAI played a pivotal role.
          AI hasn’t exactly "arrived" in 2022—it’s been in existence for a very
          long time, but it never reached the mass until ChatGPT. This
          democratization has triggered a significant behavioral shift in the
          way we perceive and interact with technology. What we’re witnessing
          with AI agents is the ripple effect of this metamorphosis.
        </p>

        <h2>What Does the Future (Present?) Hold?</h2>

        <p>
          AI agents are not a fad or a bubble (at least, not yet!). They will
          cannibalize the traditional software we’re accustomed to.
          Organizations will—and should—evolve and adapt to this change.
        </p>

        <h2>What Are We Gonna Do?</h2>

        <p>
          As users and companies navigate this transition, there are bound to be
          many uncertainties along the way. To help with that, we are launching
          a community exclusively for AI agents. This forum will act as a base
          to ideate, share, and collaborate on the wisdom and perils of AI
          agents—and only AI agents
        </p>
      </Prose>
    </>
  );
}
