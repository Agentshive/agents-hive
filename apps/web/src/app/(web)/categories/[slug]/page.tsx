import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { SearchParams } from "nuqs/server";
import { Suspense, cache } from "react";
import { CategoryToolListing } from "~/app/(web)/categories/[slug]/listing";
import { ToolQuerySkeleton } from "~/components/web/agents/agents-query";
import { Breadcrumbs } from "~/components/web/ui/breadcrumbs";
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro";
import { metadataConfig } from "~/config/metadata";
import type { CategoryOne } from "~/server/web/categories/payloads";
import { Button } from "~/components/web/ui/button";
import { ExternalLink } from "~/components/web/external-link";
import {
  findCategory,
  findCategorySlugs,
} from "~/server/web/categories/queries";
import { Section } from "~/components/web/ui/section";
import { Stack } from "~/components/common/stack";
import { ArrowUpRightIcon } from "lucide-react";
import { InternalLink } from "~/components/web/internalLink";
import { BrandLink } from "~/components/web/ui/brand-link";
import { Input } from "~/components/web/ui/input";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
};

export const getCategory = cache(async ({ params }: PageProps) => {
  const { slug } = await params;
  const category = await findCategory({ where: { slug } });

  if (!category) {
    notFound();
  }

  return category;
});

const getMetadata = (category: CategoryOne): Metadata => {
  const name = category.label || `${category.name} AI agent`;

  return {
    title: `${name}`,
    description: ``,
  };
};

export const generateStaticParams = async () => {
  const categories = await findCategorySlugs({});
  return categories.map(({ slug }) => ({ slug }));
};

export const generateMetadata = async (props: PageProps) => {
  const category = await getCategory(props);
  const url = `/categories/${category.slug}`;

  return {
    ...getMetadata(category),
    alternates: { ...metadataConfig.alternates, canonical: url },
    openGraph: { ...metadataConfig.openGraph, url },
  };
};

export default async function CategoryPage(props: PageProps) {
  const category = await getCategory(props);
  const { title, description } = getMetadata(category);
  // console.log("category", category);
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
                {
                  href: `/categories/${category.slug}`,
                  name: category.label || category.name,
                },
              ]}
            />
            <Intro>
              <IntroTitle>{`${title}`}</IntroTitle>
              {/* <IntroDescription className="max-w-3xl">{description}</IntroDescription> */}
            </Intro>
            <Button suffix={<ArrowUpRightIcon />} asChild>
              <InternalLink
                href={`/categories/${category.slug}/list`}
                // rel={category.isFeatured ? "noopener noreferrer" : undefined}
                eventName="click_website"
                // eventProps={{ url: category.website }}
              >
                Explore agents in {category.label || category.name}
              </InternalLink>
            </Button>

            <div className="flex flex-1 flex-col items-start gap-4 max-md:order-1 md:gap-6">
              <div className="w-full flex flex-col ">
                {category.description && (
                  <div className="space-y-2 py-6 first:pt-0 last:pb-0">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Description
                    </h2>
                    <p className="text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                )}
                {category.whoIsItFor && (
                  <div className="space-y-2 py-6 first:pt-0 last:pb-0">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Who is it for?
                    </h2>
                    <p className="text-muted-foreground">
                      {category.whoIsItFor}
                    </p>
                  </div>
                )}

                {category.toBudget && (
                  <div className="space-y-2 py-6">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Tools Replaced
                    </h2>
                    <p className="text-muted-foreground">{category.toBudget}</p>
                  </div>
                )}

                {category.benefits && (
                  <div className="space-y-2 py-6">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Benefits
                    </h2>
                    <p className="text-muted-foreground">{category.benefits}</p>
                  </div>
                )}

                {category.dominantFeatures && (
                  <div className="space-y-2 py-6">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Dominant Features
                    </h2>
                    <div className="text-muted-foreground flex flex-wrap gap-2">
                      {category.dominantFeatures
                        .split(",")
                        .map((feature, index) => (
                          <BrandLink
                            key={index}
                            href="#"
                            name={feature.trim()}
                            faviconUrl=""
                          />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Section.Content>

          <Section.Sidebar className="max-md:contents">
            {/* <RepositoryDetails tool={tool} className="max-md:order-3" /> */}

            <div className="space-y-2 py-6">
              <h2 className="text-2xl font-semibold tracking-tight">
                Category news
              </h2>
              {category.categoryNews?.map((news, index) => (
                <div key={index} className="space-y-2 py-4">
                  <p className="text-muted-foreground">{news}</p>
                  <hr className="border-t border-muted-foreground/20" />
                </div>
              ))}
            </div>
            <div className="space-y-2 py-6">
              <h2 className="text-2xl font-semibold tracking-tight">
                Conversations
              </h2>
              {/* {category.conversations?.map((convo, index) => (
                <div key={index} className="space-y-2 py-4">
                  <p className="text-muted-foreground">{convo}</p>
                  <hr className="border-t border-muted-foreground/20" />
                </div>
              ))} */}
            </div>

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
        {/* <Suspense
          fallback={
            <Listing title={`Open source alternatives similar to ${tool.name}:`}>
              <ToolListSkeleton count={3} />
            </Listing>
          }
        >
          <RelatedTools tool={tool} />
        </Suspense> */}

        {/* JSON-LD */}
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        /> */}
      </div>
      <div className="space-y-2 py-6">
        <h2 className="text-2xl font-semibold tracking-tight">Contribute</h2>
        <h3>Request a new feature.</h3>
        <p>What's missing?</p>
        {/* <Input type="text" placeholder="What's missing?" />
        <Button>Submit</Button> */}
      </div>
    </>
  );
}
