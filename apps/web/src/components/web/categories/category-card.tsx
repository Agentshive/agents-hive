import plur from "plur";
import type { ComponentProps } from "react";
import { Link } from "~/components/common/link";
import { Skeleton } from "~/components/common/skeleton";
import {
  CardSimple,
  CardSimpleCaption,
  CardSimpleDivider,
  CardSimpleTitle,
} from "~/components/web/ui/card-simple";
import type { CategoryMany } from "~/server/web/categories/payloads";
import { Card, CardDescription, CardHeader } from "../ui/card";
import { Favicon } from "../ui/favicon";
import { H4 } from "~/components/common/heading";
import { Button } from "~/components/web/ui/button";
import { ExternalLink } from "~/components/web/external-link";
import { ArrowUpRightIcon } from "~/components/common/icons/arrowuprighticon";

type CategoryCardProps = ComponentProps<typeof CardSimple> & {
  category: CategoryMany;
};

const CategoryCard = ({ category, ...props }: CategoryCardProps) => {
  return (
    <Card
      asChild
      {...props}
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 42px) 0, 100% 42px, 100% 100%, 0 100%)",
      }}
      className="group hover:bg-[#FF8A5A] transition-colors duration-200"
    >
      <Link href={`/categories/${category.slug}/list`}>
        <CardHeader>
          {/* <Favicon
            src={`/categories/${category.slug}.webp`}
            title={category.name}
          /> */}
          <H4 as="h3" className="truncate">
            {category.name}
          </H4>
          <div className="flex items-center gap-3 ml-auto">
            <button className="bg-black hover:bg-black  rounded-full">
              <ArrowUpRightIcon className="text-white w-4 h-4" />
            </button>
          </div>
        </CardHeader>

        {category && (
          <CardDescription className="line-clamp-4 pb-6 text-white group-hover:text-black">
            {`${category._count.tools} ${plur(
              "AI agent",
              category._count.tools
            )}`}
          </CardDescription>
        )}
        <CardDescription className="line-clamp-4 text-white group-hover:text-black custom-font">
          {category.description}
        </CardDescription>
      </Link>
    </Card>
  );
};

const CategoryCardSkeleton = () => {
  return (
    <CardSimple>
      <CardSimpleTitle className="w-1/3">
        <Skeleton>&nbsp;</Skeleton>
      </CardSimpleTitle>

      <Skeleton className="h-0.5 flex-1" />

      <CardSimpleCaption className="w-1/4">
        <Skeleton>&nbsp;</Skeleton>
      </CardSimpleCaption>
    </CardSimple>
  );
};

export { CategoryCard, CategoryCardSkeleton };
