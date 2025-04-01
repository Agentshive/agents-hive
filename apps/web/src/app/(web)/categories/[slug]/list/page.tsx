import type { Metadata } from "next"
import type { SearchParams } from "nuqs/server"
import { Suspense } from "react"
import { ToolQuerySkeleton } from "~/components/web/agents/agents-query"
import { Breadcrumbs } from "~/components/web/ui/breadcrumbs"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { metadataConfig } from "~/config/metadata"
import { getCategory } from "../page"
import { CategoryToolListing } from "~/app/(web)/categories/[slug]/listing"

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<SearchParams>
}



// export const metadata: Metadata = {
//   title: "Discover The Largest AI Agent Marketplace.",
//   description:
//     "AI SDR agents are artificial intelligence-driven tools designed to assist in sales development. They automate lead generation, engage with potential customers through personalized communication, qualify leads, and schedule appointments, allowing human sales teams to focus on closing deals and building relationships.",
//   openGraph: { ...metadataConfig.openGraph, url: "/agents-list" },
//   alternates: { ...metadataConfig.alternates, canonical: "/agents-list" },
// }

export default async function AgentsListPage(props: PageProps) {
  const category = await getCategory(props);
  return (
    <>
      <Breadcrumbs
          items={[
            {
              href: "/categories",
              name: "Categories",
            },
            // {
            //   href: `/categories/${category.slug}`,
            //   name: category.label || category.name,
            // },
            // {
            //   href: `/categories/${category.slug}`,
            //   name: category.label  || category.name ,
            // },
          ]}
      />

      {/* <Intro>
        <IntroTitle>{metadata.title?.toString()}</IntroTitle>
        <IntroDescription>{metadata.description?.toString()}</IntroDescription>
      </Intro> */}

      <Intro>
        <IntroTitle>{`${category.name}`}</IntroTitle>
        <IntroDescription className="max-w-3xl">{category.description}</IntroDescription>
      </Intro>

      <Suspense fallback={<ToolQuerySkeleton />}>
        <CategoryToolListing category={category} searchParams={props.searchParams} />
      </Suspense>
    </>
  )
}
