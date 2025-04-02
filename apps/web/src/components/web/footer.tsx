import { formatNumber } from "@curiousleaf/utils";
import { AtSignIcon, RssIcon } from "lucide-react";
import type { HTMLAttributes } from "react";
import { H5, H6 } from "~/components/common/heading";
import { BrandXIcon } from "~/components/common/icons/brand-x";
import { BrandLinkedInIcon } from "~/components/common/icons/brand-linkedin";
import { Stack } from "~/components/common/stack";
import { NavLink } from "~/components/web/ui/nav-link";
import { Tooltip, TooltipProvider } from "~/components/web/ui/tooltip";
import { config } from "~/config";
import { cx } from "~/utils/cva";
import { Logo } from "./ui/logo";

type FooterProps = HTMLAttributes<HTMLElement> & {
  hideNewsletter?: boolean;
};
export const Footer = ({
  children,
  className,
  hideNewsletter,
  ...props
}: FooterProps) => {
  return (
    <footer
      className={cx(
        "flex flex-col gap-y-8 mt-auto pt-8 border-t border-foreground/10",
        className
      )}
      {...props}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <Logo className="mr-auto w-24 h-auto md:w-32 lg:w-40 xl:w-48" />
          <p className="text-sm text-muted">
            Discover the best AI agents from across the internet.
          </p>

          <TooltipProvider delayDuration={500} disableHoverableContent>
            <div className="flex gap-4">
              <Tooltip tooltip="Contact us">
                <NavLink
                  href={`mailto:${config.site.email}`}
                  target="_blank"
                  rel="nofollow noreferrer"
                  aria-label="Contact us"
                >
                  <AtSignIcon className="size-5" />
                </NavLink>
              </Tooltip>

              <Tooltip tooltip="Follow us on X/Twitter">
                <NavLink
                  href={config.links.twitter}
                  target="_blank"
                  rel="nofollow noreferrer"
                >
                  <BrandXIcon className="size-5" />
                </NavLink>
              </Tooltip>

              <Tooltip tooltip="Follow us on LinkedIn">
                <NavLink
                  href={config.links.linkedin}
                  target="_blank"
                  rel="nofollow noreferrer"
                >
                  <BrandLinkedInIcon className="size-5" />
                </NavLink>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>

        {/* Top Categories Section */}
        <div className="flex flex-col gap-2">
          <H6 as="strong">Top Categories</H6>
          <NavLink href="/">Customer Service</NavLink>
          <NavLink href="/">HR</NavLink>
          <NavLink href="/">Design</NavLink>
          {/* <NavLink href="/">Marketing</NavLink>
          <NavLink href="/">Science</NavLink>
          <NavLink href="/">Other</NavLink>
          <NavLink href="/">Voice AI Agents</NavLink>
          <NavLink href="/">Coding</NavLink> */}
        </div>

        {/* Navigation Section */}
        <div className="flex flex-col gap-2">
          <H6 as="strong">Navigation</H6>
          <NavLink href="/categories">All categories</NavLink>
          <NavLink href="/agents-list">All agents</NavLink>
          <NavLink href="/">All tags</NavLink>

          {/* <NavLink href="/">Blog</NavLink>
          <NavLink href="/">Newsletter</NavLink>
          <NavLink href="/">Community</NavLink> */}
        </div>

        {/* Collaboration Section */}
        <div className="flex flex-col gap-2">
          <H6 as="strong">Collaboration</H6>
          <NavLink href="mailto:hello@agentshive.ai">
            hello@agentshive.ai
          </NavLink>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 w-full text-[5px] sm:text-xs md:text-sm text-muted">
        {/* <NavLink
          href={config.links.author}
          className="text-xs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/authors/piotrkulpinski.webp"
            alt="Piotr Kulpinski"
            loading="lazy"
            width="16"
            height="16"
            decoding="async"
            className="max-sm:hidden size-4 rounded-full"
          />
          Made by Piotr Kulpinski
        </NavLink> */}

        {/* <p className="text-xs text-muted">This website may contain affiliate links</p> */}
      </div>

      {children}
    </footer>
  );
};
