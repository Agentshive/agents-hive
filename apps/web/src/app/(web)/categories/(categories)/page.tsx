import type { Metadata } from "next"
import { Suspense } from "react"
import { CategoryListing } from "~/app/(web)/categories/(categories)/listing"
import { CategoryListSkeleton } from "~/components/web/categories/category-list"
import { Breadcrumbs } from "~/components/web/ui/breadcrumbs"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { metadataConfig } from "~/config/metadata"

export const metadata: Metadata = {
  title: "AI Agents Listed",
  // "The Largest AI Agent Marketplace"
  description: "Browse AI Agents by category",
  // "Categories"
  openGraph: { ...metadataConfig.openGraph, url: "/categories" },
  alternates: { ...metadataConfig.alternates, canonical: "/categories" },
}

export default function Categories() {
  return (
    <>
      <Breadcrumbs
        items={[
          {
            href: "/categories",
            name: "Categories",
          },
        ]}
      />

      <Intro>
        <IntroTitle>{`${metadata.title}`}</IntroTitle>
        <IntroDescription>{metadata.description}</IntroDescription>
      </Intro>

      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoryListing />
      </Suspense>
    </>
  )
}
