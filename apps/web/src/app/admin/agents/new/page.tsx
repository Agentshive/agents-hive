import { ToolForm } from "~/app/admin/agents/_components/agents-form"
import { Wrapper } from "~/components/admin/ui/wrapper"
import { H3 } from "~/components/common/heading"
import { findAlternativeList } from "~/server/admin/alternatives/queries"
import { findCategoryList } from "~/server/admin/categories/queries"

export default function CreateToolPage() {
  return (
    <Wrapper size="md">
      <H3>Create AI agent</H3>

      <ToolForm alternatives={findAlternativeList()} categories={findCategoryList()} />
    </Wrapper>
  )
}
