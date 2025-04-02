import { formatNumber } from "@curiousleaf/utils";
import { formatDistanceToNowStrict } from "date-fns";
import {
  ArrowUpRightIcon,
  GitForkIcon,
  StarIcon,
  TimerIcon,
} from "lucide-react";
import type { ComponentProps } from "react";
import { H4 } from "~/components/common/heading";
import { GtwosIcon } from "~/components/common/icons/gtwos";
import { Link } from "~/components/common/link";
import { Skeleton } from "~/components/common/skeleton";
import { Stack } from "~/components/common/stack";
import { ToolBadges } from "~/components/web/agents/agents-badges";
import { Badge } from "~/components/web/ui/badge";
import { Card, CardDescription, CardHeader } from "~/components/web/ui/card";
import { Favicon } from "~/components/web/ui/favicon";
import { Insights } from "~/components/web/ui/insights";
import type { ToolMany } from "~/server/web/tools/payloads";

type ToolCardProps = ComponentProps<typeof Card> & {
  tool: ToolMany;

  /**
   * Disables the view transition.
   */
  isRelated?: boolean;
};

const ToolCard = ({ className, tool, isRelated, ...props }: ToolCardProps) => {
  const insights = [
    // { label: "Rating", value: `${tool.rating}/5`, icon: <StarIcon className="w-3 h-3" /> },
    // { label: "Reviews", value: formatNumber(tool.reviews), icon: "" },

    { label: "Category", value: tool.category, icon: "" },
    { label: "Features", value: tool.features, icon: "" },
    { label: "Price", value: `₹${tool.price}`, icon: "" },
    // {
    //   label: "Last commit",
    //   value:
    //     tool.lastCommitDate && formatDistanceToNowStrict(tool.lastCommitDate, { addSuffix: true }),
    //   icon: <TimerIcon />,
    // },
  ];
  return (
    <Card
      asChild
      {...props}
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 42px) 0, 100% 42px, 100% 100%, 0 100%)",
        borderRadius: "4px",
      }}
      className="group hover:bg-[#FF8A5A] transition-colors duration-200"
    >
      <Link href={`/${tool.slug}`} className="group">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Favicon src={tool.faviconUrl} title={tool.name} 
            />
            <H4 as="h3" className="truncate">
              {tool.name}
            </H4>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <ToolBadges tool={tool}>
              {tool.discountAmount && (
                <Badge variant="success">Get {tool.discountAmount}!</Badge>
              )}
            </ToolBadges>

            <button className="bg-black hover:bg-black  p-2 rounded-full">
              <ArrowUpRightIcon className="text-white w-4 h-4" />
            </button>
          </div>
        </CardHeader>

        <div className="relative size-full flex flex-col group">
          <Stack
            size="lg"
            direction="column"
            className="items-stretch absolute inset-0 opacity-0 transition-opacity group-hover:text-black group-hover:opacity-500"
          >
            {tool.description && (
              <CardDescription className="line-clamp-4 text-white group-hover:text-black">
                {tool.description}
              </CardDescription>
            )}

            {!!tool.alternatives.length && (
              <Stack className="mt-auto text-sm">
                <span>
                  <span className="sr-only">Open Source </span>Alternative to:
                </span>

                {tool.alternatives.map(({ slug, name, faviconUrl }) => (
                  <Stack size="xs" key={slug}>
                    <Favicon
                      src={faviconUrl}
                      title={name}
                      className="size-6 p-[3px]"
                    />
                    <strong className="font-medium">{name}</strong>
                  </Stack>
                ))}
              </Stack>
            )}
          </Stack>

          <Stack
            size="lg"
            direction="column"
            className="flex-1 transition-opacity duration-200 group-hover:opacity-0"
          >
            {tool.description ? (
              <CardDescription className="line-clamp-2">
                {tool.description}
              </CardDescription>
            ) : tool.tagline ? (
              <CardDescription className="line-clamp-2">
                {tool.tagline}
              </CardDescription>
            ) : null}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {/* <GtwosIcon className="w-4 h-4 text-gray-500 mr-1 gap-3" /> */}
                  {/* 
                  <span className="text-sm font-medium pr-1 pl-1"> 4.3/5</span> */}
                  {/* <StarIcon className="w-4 h-4 text-white-500 mr-1" />
                  <StarIcon className="w-4 h-4 text-white-500 mr-1" />
                  <StarIcon className="w-4 h-4 text-white-500 mr-1" />
                  <StarIcon className="w-4 h-4 text-whitew-500 mr-1" /> */}
                </div>
                {/* <span className="text-sm text-gray-500 ">(2,236 Reviews)</span> */}
              </div>
            </div>

            <div className="flex justify-between items-center w-full border-t border-gray-500 p-2">
              {tool.category && (
                <Badge
                  variant="outline"
                  className="px-3 py-1 border border-gray-500 rounded-[4px] text-sm"
                >
                  {tool.category}
                </Badge>
              )}

              {tool.price !== undefined && (
                <div className="text-orange-400 font-bold">
                  {tool.price === 0 ? "Free" : `₹${tool.price}`}
                </div>
              )}
            </div>
          </Stack>
        </div>
      </Link>
    </Card>
  );
};

const ToolCardSkeleton = () => {
  // const insights = [
  //   { label: "Stars", value: <Skeleton className="h-4 w-16" />, icon: <StarIcon /> },
  //   { label: "Forks", value: <Skeleton className="h-4 w-14" />, icon: <GitForkIcon /> },
  //   { label: "Last commit", value: <Skeleton className="h-4 w-20" />, icon: <TimerIcon /> },
  // ]

  return (
    <Card
      hover={false}
      className="items-stretch select-none"
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 42px) 0, 100% 42px, 100% 100%, 0 100%)",
      }}
    >
      <CardHeader>
        <Favicon
          src="/agents-hive-favicon.png"
          className="animate-pulse opacity-50"
        />

        <H4 className="w-2/3">
          <Skeleton>&nbsp;</Skeleton>
        </H4>
      </CardHeader>

      <CardDescription className="flex flex-col gap-0.5">
        <Skeleton className="h-5 w-4/5">&nbsp;</Skeleton>
        <Skeleton className="h-5 w-1/2">&nbsp;</Skeleton>
      </CardDescription>

      {/* <Stack size="sm">
        <Insights insights={insights} className="mt-auto animate-pulse" />
      </Stack> */}
    </Card>
  );
};

export { ToolCard, ToolCardSkeleton };
