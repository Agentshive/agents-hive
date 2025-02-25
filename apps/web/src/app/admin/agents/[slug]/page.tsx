import { notFound } from "next/navigation"
import { UpdateToolActions } from "~/app/admin/agents/[slug]/actions"
import { ToolForm } from "~/app/admin/agents/_components/agents-form"
import { Wrapper } from "~/components/admin/ui/wrapper"
import { H3 } from "~/components/common/heading"
import { findAlternativeList } from "~/server/admin/alternatives/queries"
import { findCategoryList } from "~/server/admin/categories/queries"
import { findToolBySlug } from "~/server/admin/agents/queries"

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function UpdateToolPage({ params }: PageProps) {
  const { slug } = await params
  const tool = await findToolBySlug(slug)

  if (!tool) {
    return notFound()
  }

  return (
    <Wrapper size="md">
      <div className="flex items-center justify-between gap-4">
        <H3>Update AI agent</H3>

        <UpdateToolActions tool={tool} />
      </div>

      <ToolForm tool={tool} alternatives={findAlternativeList()} categories={findCategoryList()} />
    </Wrapper>
  )
}
