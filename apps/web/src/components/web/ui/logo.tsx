import type { ComponentProps } from "react"
import { Link } from "~/components/common/link"
import { Stack } from "~/components/common/stack"
import { LogoSymbol } from "~/components/web/ui/logo-symbol"
import { config } from "~/config"
import { cx } from "~/utils/cva"
import { Favicon } from "./favicon"
import { Headericon } from "~/components/common/icons/agentshive-heading"

export const Logo = ({ className, ...props }: ComponentProps<typeof Stack>) => {
  return (
    <Stack size="lg" className={cx("group/logo text-foreground", className)} asChild {...props}>
      <Link href="/">
        {/* <LogoSymbol className="duration-300! ease-in-out! will-change-transform group-hover/logo:rotate-90" /> */}
      {/* <Favicon src="/agents-hive-favicon.png" className=" opacity-500 w-12 h-12 " /> */}
        {/* className="animate-pulse opacity-50 */}
        <Headericon  className=" opacity-500 w-2 h-10 " />
{/* 
        <span className="font-normal text-2xl">{config.site.name}</span> */}
      </Link>
    </Stack>
  )
}
