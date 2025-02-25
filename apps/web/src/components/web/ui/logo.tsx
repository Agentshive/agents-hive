import type { ComponentProps } from "react"
import { Link } from "~/components/common/link"
import { Stack } from "~/components/common/stack"
import { LogoSymbol } from "~/components/web/ui/logo-symbol"
import { config } from "~/config"
import { cx } from "~/utils/cva"
import { Favicon } from "./favicon"

export const Logo = ({ className, ...props }: ComponentProps<typeof Stack>) => {
  return (
    <Stack size="lg" className={cx("group/logo text-foreground", className)} asChild {...props}>
      <Link href="/">
        {/* <LogoSymbol className="duration-300! ease-in-out! will-change-transform group-hover/logo:rotate-90" /> */}
        <Favicon src="/agents-hive-favicon.png" className="animate-pulse opacity-50" />


        <span className="font-medium text-2xl">{config.site.name}</span>
      </Link>
    </Stack>
  )
}
