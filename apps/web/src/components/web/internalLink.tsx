"use client"

import { type Properties, posthog } from "posthog-js"
import type { ComponentProps } from "react"
import { Link } from "~/components/common/link"
import { updateUrlWithSearchParams } from "~/utils/queryString"

type InternalLinkProps = ComponentProps<typeof Link> &
  ComponentProps<"a"> & {
    eventName?: string
    eventProps?: Properties
  }

export const InternalLink = ({
  href,
  target = "_blank",
  rel = "noopener noreferrer nofollow",
  eventName,
  eventProps,
  ...props
}: InternalLinkProps) => {
  return (
    <Link
      href={updateUrlWithSearchParams(href, { ref: "agentshive" })}
    //   target={target}
      rel={rel}
      onClick={() => eventName && posthog.capture(eventName, eventProps)}
      {...props}
    />
  )
}
